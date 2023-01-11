import * as authAPI from '../testSuites/API/suiteAuthAPI.js';
import * as projectsAPI from '../testSuites/API/suiteProjectsAPI.js';
import * as laborReportAPI from '../testSuites/API/suiteLaborReportAPI.js';
import * as leavePeriodAPI from '../testSuites/API/suiteLeavePeriodAPI.js';

//удаление всех трудозатрат пользователя между startDate и endDate
export function deleteUserLaborReports(userId, startDate, endDate, criteria = 'ACTIVE') {
  return laborReportAPI
    .getUserLaborReport(userId, startDate, endDate, criteria)
    .then(function (response) {
      response.body.forEach((laborReport) => {
        laborReport.forEach((report) => {
          laborReportAPI.deleteLaborReport(report.id);
        });
      });
    });
}

//удаление всех отсутствий пользователя
export function deleteUserLeavePeriods(userId) {
  return leavePeriodAPI.getUserLeavePeriods(userId).then(function (response) {
    response.body.forEach((leavePeriod) => {
      leavePeriodAPI.deleteLeavePeriod(leavePeriod.id);
    });
  });
}

//удаление всех тестовых проектов
export function deleteAllTestProjects() {
  authAPI
    .login(creds.admin)
    .then((response) => {
      //сохранение данных пользователя
      userAuthInfoByAPI = response.body;
      //сохранение токена в кукис
      cy.setCookie('auth_token', userAuthInfoByAPI.token);
      projectsAPI.getAllProjects();
    })
    .then((response) => {
      //удалить все тестовые проекты
      response.body.forEach((prjElem) => {
        if (prjElem.code.includes('cytest')) {
          projectsAPI.deleteProject(prjElem.id);
        }
      });
    });
}
