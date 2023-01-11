//получение всех периодов отсутствия в системе
export function getAllLeavePeriods(checkResponseCode = true) {
  return cy.request({
    method: 'GET',
    url: '/api/leave-periods',
    failOnStatusCode: checkResponseCode
  });
}

//получение периодов отсутствия пользователя
export function getUserLeavePeriods(userId, checkResponseCode = true) {
  return cy.request({
    method: 'GET',
    url: '/api/leave-periods?userId=' + userId,
    failOnStatusCode: checkResponseCode
  });
}

//создание периода отсутствия пользователя
export function createLeavePeriod(userId, reason, startDate, endDate, checkResponseCode = true) {
  return cy.request({
    method: 'POST',
    url: '/api/leave-periods/',
    failOnStatusCode: checkResponseCode,
    body: {
      userId: userId,
      reason: reason,
      startDate: startDate,
      endDate: endDate
    }
  });
}

//обновление периода отсутствия пользователя
export function updateLeavePeriod(
  userId,
  periodId,
  reason,
  startDate,
  endDate,
  checkResponseCode = true
) {
  return cy.request({
    method: 'PUT',
    url: '/api/leave-periods/' + periodId,
    failOnStatusCode: checkResponseCode,
    body: {
      reason: reason,
      startDate: startDate,
      endDate: endDate,
      userId: userId
    }
  });
}

//удаление периода отсутствия пользователя
export function deleteLeavePeriod(periodId, checkResponseCode = true) {
  return cy.request({
    method: 'DELETE',
    url: '/api/leave-periods/' + periodId,
    failOnStatusCode: checkResponseCode
  });
}

//разбиение периода отсутствия пользователя
export function splitLeavePeriod(periodId, checkResponseCode = true) {
  return cy.request({
    method: 'PUT',
    url: '/api/leave-periods/' + periodId + '/fork',
    failOnStatusCode: checkResponseCode,
    body: {
      date: currentDate
    }
  });
}
