import * as authAPI from '../../testSuites/API/suiteAuthAPI.js';
import * as projectsAPI from '../../testSuites/API/suiteProjectsAPI.js';
import * as laborReportAPI from '../../testSuites/API/suiteLaborReportAPI.js';

//выполнение тестов под пользователями, которые заданы в переменной окружения userForTest
//all = все пользователи
for (let nameOfUserObj in creds) {
  const userCreds = creds[nameOfUserObj];
  if (Cypress.env('userForTest') != 'all' && nameOfUserObj != Cypress.env('userForTest')) {
    continue;
  }

  //API тесты по трудозатратам
  describe('Labor Report API ' + nameOfUserObj, () => {
    let userPrjId;
    before(() => {
      //вход в систему
      authAPI.login(userCreds).then((response) => {
        //сохранение данных пользователя
        userAuthInfoByAPI = response.body;
        //сохранение токена в кукис
        cy.setCookie('auth_token', userAuthInfoByAPI.token);
        //удаление всех периодов отсутствия
        helpersAPI.deleteUserLeavePeriods(userAuthInfoByAPI.user.id);
      });
    });

    beforeEach(() => {
      //сохранение токена в кукис
      cy.setCookie('auth_token', userAuthInfoByAPI.token);
      //удаление всех отчетов о трудозатратах за текущеий месяц
      helpersAPI.deleteUserLaborReports(
        userAuthInfoByAPI.user.id,
        currentMonthStartDate,
        currentMonthEndDate
      );
      //получение первого проекта, на который назначен пользователь
      projectsAPI.getUserProjects().then((response) => {
        userPrjId = response.body[0].id;
      });
    });

    //получение всех трудозатрат в системе (кроме user)
    if (userCreds.sysRole != 'user') {
      it('GET /labor-reports/Получить все отчеты от трудозатратах 200 ' + nameOfUserObj, () => {
        laborReportAPI.createLaborReport(
          helpers.generateWorkHours(),
          currentDate,
          userAuthInfoByAPI.user.id,
          userPrjId
        );

        laborReportAPI
          .getAllLaborReport(currentMonthStartDate, currentMonthEndDate)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0].date).includes(currentDate);
            expect(response.body[0].hours).a('number');
            expect(response.body[0].id).a('number');
            expect(response.body[0].overtimeWork).a('number');
            expect(response.body[0].project).a('object');
            expect(response.body[0].projectId).a('number');
            expect(response.body[0].userId).a('number');
          });
      });
    }

    //невозможность получения всех трудозатрат в системе для user
    if (userCreds.sysRole == 'user') {
      it('GET /labor-reports/Получить все отчеты от трудозатратах 403 ' + nameOfUserObj, () => {
        laborReportAPI.createLaborReport(
          helpers.generateWorkHours(),
          currentDate,
          userAuthInfoByAPI.user.id,
          userPrjId
        );
        laborReportAPI
          .getAllLaborReport(currentMonthStartDate, currentMonthEndDate, false)
          .then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body.message).to.eq('Отказано в доступе');
            expect(response.body.timestamp).a('string').includes(currentDate);
          });
      });
    }

    //получение cвоих трудозатрат пользователем
    it('GET /labor-reports/Получить свои трудозатраты пользователем 200 ' + nameOfUserObj, () => {
      let workedHours = helpers.generateWorkHours();
      laborReportAPI
        .createLaborReport(workedHours, currentDate, userAuthInfoByAPI.user.id, userPrjId)
        .then(() => {
          laborReportAPI.getUserLaborReport(
            userAuthInfoByAPI.user.id,
            currentMonthStartDate,
            currentMonthEndDate,
            'ACTIVE'
          );
        })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).a('array');
          expect(response.body[0][0].date).a('string').includes(currentDate);
          expect(response.body[0][0].hours).eq(workedHours);
          expect(response.body[0][0].id).a('number');
          expect(response.body[0][0].overtimeWork).eq(0);
          expect(response.body[0][0].projectId).eq(userPrjId);
          expect(response.body[0][0].userId).eq(userAuthInfoByAPI.user.id);
        });
    });

    //добавление своих трудозатрат пользователем
    it('POST /labor-reports/Создать отчет о трудозатратах 201 ' + nameOfUserObj, () => {
      let workedHours = helpers.generateWorkHours();
      laborReportAPI
        .createLaborReport(workedHours, currentDate, userAuthInfoByAPI.user.id, userPrjId)
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).a('array');
          expect(response.body[0].id).a('number');
          expect(response.body[0].hours).eq(workedHours);
          expect(response.body[0].date).a('string').include(currentDate);
          expect(response.body[0].overtimeWork).eq(0);
          expect(response.body[0].projectId).eq(userPrjId);
          expect(response.body[0].userId).eq(userAuthInfoByAPI.user.id);
        });
    });

    //редактирование своих трудозатрат пользователем
    it('PUT/labor-reports/Редактировать отчет о трудозатратах 200 ' + nameOfUserObj, () => {
      laborReportAPI
        .createLaborReport(
          helpers.generateWorkHours(),
          currentDate,
          userAuthInfoByAPI.user.id,
          userPrjId
        )
        .then((response) => {
          laborReportAPI.changeLaborReport(
            response.body[0].id,
            helpers.generateWorkHours(),
            response.body[0].date,
            userAuthInfoByAPI.user.id,
            userPrjId
          );
        })
        .then((response) => {
          expect(response.status).to.eq(200);
        });
    });

    //удаление своих трудозатрат пользователем
    it(
      'DELETE/labor-reports/{laborReportId} Удалить отчет о трудозатратах  204 ' + nameOfUserObj,
      () => {
        laborReportAPI
          .createLaborReport(
            helpers.generateWorkHours(),
            currentDate,
            userAuthInfoByAPI.user.id,
            userPrjId
          )
          .then((response) => {
            laborReportAPI.deleteLaborReport(response.body[0].id);
          })
          .then((response) => {
            expect(response.status).to.eq(204);
          });
      }
    );

    //добавление своей переработки пользователем
    it('POST /labor-reports/Создать переработку 201 ' + nameOfUserObj, () => {
      laborReportAPI
        .createOvertimeReport(
          helpers.generateWorkHours(),
          currentDate,
          userAuthInfoByAPI.user.id,
          userPrjId
        )
        .then((response) => {
          expect(response.status).to.eq(201);
        });
    });
  });
}
