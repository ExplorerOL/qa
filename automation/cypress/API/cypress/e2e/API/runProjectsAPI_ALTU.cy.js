/* eslint-disable no-undef */
import * as authAPI from '../../testSuites/API/suiteAuthAPI.js';
import * as projectsAPI from '../../testSuites/API/suiteProjectsAPI.js';

//выполнение тестов под пользователями, которые заданы в переменной окружения userForTest
//all = все пользователи
for (let nameOfUserObj in creds) {
  const userCreds = creds[nameOfUserObj];
  if (Cypress.env('userForTest') != 'all' && nameOfUserObj != Cypress.env('userForTest')) {
    continue;
  }

  //API тесты по трудозатратам
  describe('Projects API ' + nameOfUserObj, () => {
    before(() => {
      //удаление всех тестовых проектов
      helpersAPI.deleteAllTestProjects();
      //вход в систему
      authAPI.login(userCreds).then((response) => {
        //сохранение данных пользователя
        userAuthInfoByAPI = response.body;
      });
    });

    beforeEach(() => {
      //сохранение токена в кукис
      cy.setCookie('auth_token', userAuthInfoByAPI.token);
    });

    if (userCreds.sysRole == 'admin' || userCreds.sysRole == 'lead') {
      //получение всех проектов системы админом и лидом
      it('GET /projects/Получить все проекты 200' + nameOfUserObj, () => {
        projectsAPI.getAllProjects().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).a('array');
          expect(response.body[0].id).a('number');
          expect(response.body[0].name).a('string').not.empty;
          expect(response.body[0].code).a('string').not.empty;
          expect(response.body[0].startDate).a('string').not.empty;
          expect(response.body[0]).property('endDate');
        });
      });
    } else {
      //получение всех проектов системы пользователем не имеющим на это прав
      it('GET /projects/Получить все проекты 403 ' + nameOfUserObj, () => {
        projectsAPI.getAllProjects().then((response) => {
          expect(response.status).to.eq(403);
          expect(response.body).a('object');
          expect(response.body.message).to.eq('Отказано в доступе');
          expect(response.body.timestamp).a('string').not.empty;
        });
      });
    }

    //получение проектов пользователя
    it(
      'GET /projects/for-current-user Получить все проекты текущего пользователя 200 ' +
        nameOfUserObj,
      () => {
        projectsAPI.getUserProjects().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).a('array');
          expect(response.body[0].id).a('number');
          expect(response.body[0].name).a('string').not.empty;
          expect(response.body[0].code).a('string').not.empty;
          expect(response.body[0].startDate).a('string').not.empty;
          expect(response.body[0]).property('endDate');
        });
      }
    );

    if (userCreds.sysRole == 'admin') {
      //создание проекта админом
      it('POST /projects/Создать проект 200 ' + nameOfUserObj, () => {
        projectsAPI.createProject().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).a('object');
          expect(response.body.id).a('number');
          expect(response.body.name).a('string').not.empty;
          expect(response.body.code).a('string').not.empty;
          expect(response.body.startDate).a('string').not.empty;
          expect(response.body.endDate).a('string').not.empty;
        });
      });
    } else {
      //создание проекта пользователем не имеющим на это прав
      it('POST /projects/Создать проект 403 ' + nameOfUserObj, () => {
        projectsAPI.createProject(false).then((response) => {
          expect(response.status).to.eq(403);
          expect(response.body).a('object');
          expect(response.body.message).to.eq('Отказано в доступе');
          expect(response.body.timestamp).a('string').not.empty;
        });
      });
    }

    if (userCreds.sysRole == 'admin') {
      //удаление проекта админом
      it('DELETE /projects/Удалить проект 200 ' + nameOfUserObj, () => {
        projectsAPI
          //создание временного проекта для удаления
          .createProject()
          .then((response) => {
            //удаление проекта
            projectsAPI.deleteProject(response.body.id);
          })
          .then((response) => {
            expect(response.status).eq(204);
          });
      });
    } else {
      //удаление проекта пользователем не имеющим на это прав
      it('DELETE /projects/Удалить проект 403 ' + nameOfUserObj, () => {
        projectsAPI
          //получение проектов пользователя
          .getUserProjects()
          .then((response) => {
            //удаление проекта пользователя
            projectsAPI.deleteProject(response.body[0].id, false);
          })
          .then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).a('object');
            expect(response.body.message).to.eq('Отказано в доступе');
            expect(response.body.timestamp).a('string').not.empty;
          });
      });
    }
  });
}
