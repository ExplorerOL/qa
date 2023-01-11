//логин (вход в систему)
export function login(userCreds, checkResponseCode = true) {
  return cy.request({
    method: 'POST',
    url: '/api/login',
    failOnStatusCode: checkResponseCode,
    body: {
      login: userCreds.username,
      password: userCreds.password
    }
  });
}

//удаление токена (выход из системы)
export function deleteToken(userToken, checkResponseCode = true) {
  return cy.request({
    method: 'DELETE',
    url: '/api/login/' + userToken,
    failOnStatusCode: checkResponseCode
  });
}

//получение пользователя по токену
export function rememberMe(userToken, checkResponseCode = true) {
  return cy.request({
    method: 'POST',
    url: '/api/login/remember-me',
    failOnStatusCode: checkResponseCode,
    body: {
      token: userToken
    }
  });
}

//сброс пароля
export function resetPassword(username, checkResponseCode = true) {
  return cy.request({
    method: 'POST',
    url: '/api/login/reset-password',
    failOnStatusCode: checkResponseCode,
    body: {
      username: username
    }
  });
}
