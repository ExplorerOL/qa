import SuitLogin from "../../testSuites/SuiteLogin.js";
import SuiteLaborReports from "../../testSuites/SuiteLaborReports.js";
import * as API from "../../support/API/APIFunctions";
import * as helpers from "../../support/helpers.js";

//файл с набором валидных учетных записей
const creds = require("../../fixtures/validUserCreds");
const leavePeriodTypes = require("../../fixtures/leavePeriodTypes.json");

//прохождение тестов под пользователями, которые заданы в окружении
//all = все пользователи
for (let nameOfUserObj in creds) {
    let userCreds = creds[nameOfUserObj];
    if (Cypress.env("userForTest") != "all" && nameOfUserObj != Cypress.env("userForTest")) {
        continue;
    }

    describe("Смоук тест " + nameOfUserObj, () => {
        beforeEach(() => {
            //отмена прохождения обучения
            localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
        });

        //тесты авторизации
        describe("Авторизация " + nameOfUserObj, () => {
            let suitLogin = new SuitLogin();

            it("Вход в систему " + nameOfUserObj, function () {
                //логин через UI
                suitLogin.doLoginUserAndCheckVisibleElems(userCreds).doNavigate();
            });

            it("Выход из системы " + nameOfUserObj, () => {
                //логин через API
                API.doLogin(userCreds).then((responseBody) => {
                    API.checkLoginOK(responseBody);
                    helpers.saveUserInfoAfterAPILogin(responseBody);
                    //сохранение токена в кукис
                    helpers.setTokenInCookies();
                });
                suitLogin.pageLaborReports.doNavigate();

                //выход из системы через UI
                suitLogin.pageLaborReports.header.doLogout();
            });
        });

        //тесты добавления и удаления отсутствий
        describe("3.1.2 Отсутствия " + nameOfUserObj, () => {
            let suitLaborReports = new SuiteLaborReports();
            let token;
            //формирование дат начала и окончания периода отсутсвия
            let startDate = helpers.calculateLeavePeriodStartDateYYYYMMDD();
            let endDate = helpers.calculateLeavePeriodEndDateYYYYMMDD();

            before(() => {
                //авторизация по API
                API.doLogin(userCreds)
                .then((responseBody) => {
                    API.checkLoginOK(responseBody);
                    helpers.saveUserInfoAfterAPILogin(responseBody);
                    
                    //сохранение токена в кукис
                    helpers.setTokenInCookies();
                        
                    //удаление всех трудозатрат за текущий месяц
                    API.deleteAllLaborReports(
                            helpers.calculateCurrentMonthFirstDayDate(),
                            helpers.calculateCurrentMonthLastDayDate())
                    })
                .then((response) => { 
                    expect(response.status).to.match(/20?/);
                })
                });

            beforeEach(() => {
                //сохранение токена в кукис
                helpers.setTokenInCookies();
                //удаление всех периодов отсутствия
                API.deleteAllLeavePeriods(Cypress.env("userAuthInfoByAPI"));
            });

            it("3.1.2.1. Добавление больничного со страницы трудозатрат " + nameOfUserObj, () => {
                suitLaborReports.addLeavePeriod(leavePeriodTypes.sickPeriodType);
            });

            it("3.1.2.1. Добавление ежегодного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                suitLaborReports.addLeavePeriod(leavePeriodTypes.vacationPeriodType);
            });

            it("3.1.2.1. Добавление административного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                suitLaborReports.addLeavePeriod(leavePeriodTypes.administrativePeriodType);
            });
            it("3.1.2.1. Добавление декретного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                suitLaborReports.addLeavePeriod(leavePeriodTypes.maternityPeriodType);
            });

            it("3.1.2.1. Удаление больничного со страницы трудозатрат " + nameOfUserObj, () => {
                //получение типа отсутствия из фикстуры
                let periodType = leavePeriodTypes.sickPeriodType;
                //добавление периода отсутствия через API
                API.addLeavePeriod(Cypress.env("userAuthInfoByAPI"), periodType, startDate, endDate);
                //удаление периода отсутствия
                suitLaborReports.deleteMostRecentLeavePeriod(periodType);
            });
            it("3.1.2.1. Удаление ежегодного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                //получение типа отсутствия из фикстуры
                let periodType = leavePeriodTypes.vacationPeriodType;
                //добавление периода отсутствия через API
                API.addLeavePeriod(Cypress.env("userAuthInfoByAPI"), periodType, startDate, endDate);
                //удаление периода отсутствия
                suitLaborReports.deleteMostRecentLeavePeriod(periodType);
            });
            it("3.1.2.1. Удаление административного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                //получение типа отсутствия из фикстуры
                let periodType = leavePeriodTypes.administrativePeriodType;
                //добавление периода отсутствия через API
                API.addLeavePeriod(Cypress.env("userAuthInfoByAPI"), periodType, startDate, endDate);
                //удаление периода отсутствия
                suitLaborReports.deleteMostRecentLeavePeriod(periodType);
            });
            it("3.1.2.1. Удаление декретного отпуска со страницы трудозатрат " + nameOfUserObj, () => {
                //получение типа отсутствия из фикстуры
                let periodType = leavePeriodTypes.maternityPeriodType;
                //добавление периода отсутствия через API
                API.addLeavePeriod(Cypress.env("userAuthInfoByAPI"), periodType, startDate, endDate);
                //удаление периода отсутствия
                suitLaborReports.deleteMostRecentLeavePeriod(periodType);
            });
        });
    });
}
