//получение всех проектов
export function getAllProjects(checkResponseCode = true) {
  return cy.request({
    method: 'GET',
    url: '/api/projects',
    failOnStatusCode: checkResponseCode
  });
}

//получение проектов пользователя
export function getUserProjects(checkResponseCode = true) {
  return cy.request({
    method: 'GET',
    url: '/api/projects/for-current-user/',
    failOnStatusCode: checkResponseCode
  });
}

//создать проект
export function createProject(checkResponseCode = true) {
  return cy.request({
    method: 'POST',
    url: '/api/projects',
    failOnStatusCode: checkResponseCode,
    body: {
      code: 'cytestPrjCode' + helpers.generateRandomString(5),
      name: 'cytestPrjName' + helpers.generateRandomString(10),
      startDate: currentMonthStartDate,
      endDate: currentMonthEndDate,
      laborReasons: false,
      resources: [
        {
          roleId: 1,
          userId: 1,
          isProjectManager: false
        }
      ]
    }
  });
}

//удаление проекта
export function deleteProject(projectId, checkResponseCode = true) {
  return cy.request({
    method: 'DELETE',
    url: '/api/projects/' + projectId,
    failOnStatusCode: checkResponseCode
  });
}
