import * as authAPI from '../../testSuites/API/suiteAuthAPI.js';
import * as leavePeriodAPI from '../../testSuites/API/suiteLeavePeriodAPI.js';

//файл с набором типов отсутствий
import leavePeriodTypes from '../../fixtures/leavePeriodTypes.json';

//выполнение тестов под пользователями, которые заданы в переменной окружения userForTest
//all = все пользователи
for (let nameOfUserObj in creds) {
  const userCreds = creds[nameOfUserObj];
  if (Cypress.env('userForTest') != 'all' && nameOfUserObj != Cypress.env('userForTest')) {
    continue;
  }

  //API тесты по отутствиям
  describe('Leave Periods API ' + nameOfUserObj, () => {
    before(() => {
      //вход в систему
      authAPI.login(userCreds).then((response) => {
        //сохранение данных пользователя
        userAuthInfoByAPI = response.body;
        //сохранение токена в кукис
        cy.setCookie('auth_token', userAuthInfoByAPI.token);
        //удаление всех трудозатрат пользователя за текущий месяц
        helpersAPI.deleteUserLaborReports(
          userAuthInfoByAPI.user.id,
          currentMonthStartDate,
          currentMonthEndDate
        );
      });
    });

    beforeEach(() => {
      //сохранение токена в кукис
      cy.setCookie('auth_token', userAuthInfoByAPI.token);
      //удаление всех периодов отсутствий пользователя
      helpersAPI.deleteUserLeavePeriods(userAuthInfoByAPI.user.id);
    });

    //получение всех отсутствий в системе
    if (userCreds.sysRole != 'user') {
      it('GET/leave-periods Получить все отсутствия в системе 200 ' + nameOfUserObj, () => {
        let leavePeriodReason = leavePeriodTypes.sick;
        leavePeriodAPI
          .createLeavePeriod(
            userAuthInfoByAPI.user.id,
            leavePeriodReason,
            currentMonthStartDate,
            currentMonthEndDate
          )
          .then(() => {
            leavePeriodAPI.getUserLeavePeriods(userAuthInfoByAPI.user.id);
          })
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).a('array').not.null;
            expect(response.body[0].id).a('number');
            expect(response.body[0].userId).a('number').eq(userAuthInfoByAPI.user.id);
            expect(response.body[0].reason).a('string').eq(leavePeriodReason);
            expect(response.body[0].startDate).a('string').include(currentMonthStartDate);
            expect(response.body[0].endDate).a('string').include(currentMonthEndDate);
          });
      });
    } else {
      it('GET/leave-periods Получить все отсутствия в системе 403 ' + nameOfUserObj, () => {
        let leavePeriodReason = leavePeriodTypes.sick;
        leavePeriodAPI
          .createLeavePeriod(
            userAuthInfoByAPI.user.id,
            leavePeriodReason,
            currentMonthStartDate,
            currentMonthEndDate
          )
          .then(() => {
            leavePeriodAPI.getUserLeavePeriods(userAuthInfoByAPI.user.id);
          })
          .then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body.message).to.eq('Отказано в доступе');
            expect(response.body.timestamp).a('string').includes(currentDate);
          });
      });
    }

    //получение отсутствий пользователя за текущий месяц
    it('GET/leave-periods?userId Получить все отсутствия пользователя 200 ' + nameOfUserObj, () => {
      let leavePeriodReason = leavePeriodTypes.sick;
      leavePeriodAPI
        .createLeavePeriod(
          userAuthInfoByAPI.user.id,
          leavePeriodReason,
          currentMonthStartDate,
          currentMonthEndDate
        )
        .then(() => {
          leavePeriodAPI.getUserLeavePeriods(userAuthInfoByAPI.user.id);
        })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).a('array').not.null;
          expect(response.body[0].id).a('number');
          expect(response.body[0].userId).a('number').eq(userAuthInfoByAPI.user.id);
          expect(response.body[0].reason).a('string').eq(leavePeriodReason);
          expect(response.body[0].startDate).a('string').include(currentMonthStartDate);
          expect(response.body[0].endDate).a('string').include(currentMonthEndDate);
        });
    });

    for (let periodType in Object(leavePeriodTypes)) {
      //создание отсутствия пользователя
      it(
        'POST/leave-periods Создать отсутствие  200 ' +
          nameOfUserObj +
          ', тип отпуска = ' +
          leavePeriodTypes[periodType],
        () => {
          leavePeriodAPI
            .createLeavePeriod(
              userAuthInfoByAPI.user.id,
              leavePeriodTypes[periodType],
              currentMonthStartDate,
              currentMonthEndDate
            )
            .then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body.id).a('number');
              expect(response.body.reason).eq(leavePeriodTypes[periodType]);
              expect(response.body.startDate).includes(currentMonthStartDate);
              expect(response.body.endDate).includes(currentMonthEndDate);
              expect(response.body.userId).eq(userAuthInfoByAPI.user.id);
              expect(response.body.user).a('object');
            });
        }
      );

      //обновление отсутствия пользователя
      it(
        'PUT /leave-periods Обновить отсутствие  200 ' +
          nameOfUserObj +
          ', тип отпуска = ' +
          leavePeriodTypes[periodType],
        () => {
          //создание отсутствия пользователя для последующего обновления
          leavePeriodAPI
            .createLeavePeriod(
              userAuthInfoByAPI.user.id,
              leavePeriodTypes[periodType],
              currentMonthStartDate,
              currentMonthEndDate
            )
            .then(() => {
              leavePeriodAPI.getUserLeavePeriods(userAuthInfoByAPI.user.id);
            })
            .then((response) => {
              leavePeriodAPI.updateLeavePeriod(
                userAuthInfoByAPI.user.id,
                response.body[0].id,
                leavePeriodTypes[periodType],
                currentDate,
                currentMonthEndDate
              );
            })
            .then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body.id).a('number');
              expect(response.body.reason).eq(leavePeriodTypes[periodType]);
              expect(response.body.startDate).includes(currentMonthStartDate);
              expect(response.body.endDate).includes(currentMonthEndDate);
              expect(response.body.userId).eq(userAuthInfoByAPI.user.id);
              expect(response.body.user).a('object');
            });
        }
      );

      //удаление отсутствия пользователя
      it(
        'DELETE/leave-periods Удалить отсутствие 204 ' +
          nameOfUserObj +
          ', тип отпуска = ' +
          leavePeriodTypes[periodType],
        () => {
          //создание отсутствия пользователя для последующего удаления
          leavePeriodAPI
            .createLeavePeriod(
              userAuthInfoByAPI.user.id,
              leavePeriodTypes[periodType],
              currentMonthStartDate,
              currentMonthEndDate
            )
            .then(() => {
              leavePeriodAPI.getUserLeavePeriods(userAuthInfoByAPI.user.id);
            })
            .then((response) => {
              leavePeriodAPI.deleteLeavePeriod(response.body[0].id);
            })
            .then((response) => {
              expect(response.status).to.eq(204);
            });
        }
      );

      //разбиение отсутствия пользователя
      it(
        'PUT/leave-periods/fork Разбить отсутствие  200 ' +
          nameOfUserObj +
          ', тип отпуска = ' +
          leavePeriodTypes[periodType],
        () => {
          //создание отсутствия пользователя для последующего разбиения
          leavePeriodAPI
            .createLeavePeriod(
              userAuthInfoByAPI.user.id,
              leavePeriodTypes[periodType],
              currentMonthStartDate,
              currentMonthEndDate
            )
            .then(() => {
              leavePeriodAPI.getUserLeavePeriods(userAuthInfoByAPI.user.id);
            })
            .then((response) => {
              leavePeriodAPI.splitLeavePeriod(response.body[0].id);
            })
            .then((response) => {
              expect(response.status).to.eq(204);
            });
        }
      );
    }
  });
}
