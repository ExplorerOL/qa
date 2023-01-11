//получение всех трудозатрат в системе
export function getAllLaborReport(startDate, endDate, checkResponseCode = true) {
  return cy.request({
    method: 'GET',
    url: '/api/labor-reports?startDate=' + startDate + '&endDate=' + endDate,
    failOnStatusCode: checkResponseCode
  });
}

//получение трудозатрат пользователя
export function getUserLaborReport(userId, startDate, endDate, criteria, checkResponseCode = true) {
  return cy.request({
    method: 'GET',
    url:
      '/api/labor-reports/user/' +
      userId +
      '?startDate=' +
      startDate +
      '&endDate=' +
      endDate +
      '&criteria=' +
      criteria,
    failOnStatusCode: checkResponseCode
  });
}

//добавление трудозатрат пользователя
export function createLaborReport(
  workHours,
  workDate,
  userId,
  projectId,
  checkResponseCode = true
) {
  return cy.request({
    method: 'POST',
    url: '/api/labor-reports',
    failOnStatusCode: checkResponseCode,
    body: [
      {
        hours: workHours,
        date: workDate,
        overtimeWork: 0,
        type: 'DEFAULT',
        userId: userId,
        projectId: projectId
      }
    ]
  });
}

//изменение трудозатрат пользователя
export function changeLaborReport(
  reportId,
  workHours,
  workDate,
  userId,
  projectId,
  checkResponseCode = true
) {
  return cy.request({
    method: 'PUT',
    url: '/api/labor-reports/' + reportId,
    failOnStatusCode: checkResponseCode,
    body: {
      hours: workHours,
      date: workDate,
      overtimeWork: 0,
      type: 'DEFAULT',
      userId: userId,
      projectId: projectId
    }
  });
}

//удаление трудозатрат пользователя
export function deleteLaborReport(reportId, checkResponseCode = true) {
  return cy.request({
    method: 'DELETE',
    url: '/api/labor-reports/' + reportId,
    failOnStatusCode: checkResponseCode
  });
}

//добавление переработки пользователя
export function createOvertimeReport(
  overtimeHours,
  workDate,
  userId,
  projectId,
  checkResponseCode = true
) {
  return cy.request({
    method: 'POST',
    url: '/api/labor-reports/overtime-work',
    failOnStatusCode: checkResponseCode,
    body: {
      date: workDate,
      overtimeWork: overtimeHours,
      type: 'OWT',
      userId: userId,
      projectId: projectId,
      taskId: null,
      stageId: null
    }
  });
}
