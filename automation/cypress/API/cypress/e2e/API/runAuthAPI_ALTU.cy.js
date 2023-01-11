import * as authAPI from '../../testSuites/API/suiteAuthAPI.js';

//выполнение тестов под пользователями, которые заданы в переменной окружения userForTest
//all = все пользователи
for (let nameOfUserObj in creds) {
  const userCreds = creds[nameOfUserObj];
  if (Cypress.env('userForTest') != 'all' && nameOfUserObj != Cypress.env('userForTest')) {
    continue;
  }

  //API тесты авторизации
  describe('Auth API ' + nameOfUserObj, () => {
    //успешный вход в систему
    it('POST /login Войти в систему 200 ' + nameOfUserObj, () => {
      authAPI.login(userCreds).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).a('string').to.not.be.empty;
        expect(response.body.user.id).a('number');
        expect(response.body.user.fullName).a('string').not.empty;
        expect(response.body.user.username).a('string').not.empty;
      });
    });

    if (nameOfUserObj == 'admin') {
      //неуспешный вход в систему c неправильным паролем
      it('POST /login Войти в систему с неверным паролем 400 ' + nameOfUserObj, () => {
        //создание копии объекта данных пользователя
        let wrongUserCreds = Object.assign({}, userCreds);
        wrongUserCreds.password = helpers.generateRandomString(10);

        authAPI.login(wrongUserCreds, false).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.eq('Неверный или просроченный логин/пароль');
          expect(response.body.timestamp).a('string').not.empty;
        });
      });

      //неуспешный вход в систему c неправильным логином
      it('POST /login Войти в систему с неверным логином 400 ' + nameOfUserObj, () => {
        //создание копии объекта данных пользователя
        let wrongUserCreds = Object.assign({}, userCreds);
        wrongUserCreds.username = helpers.generateRandomString(10);

        authAPI.login(wrongUserCreds, false).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.eq('Неверный или просроченный логин/пароль');
          expect(response.body.timestamp).a('string').not.empty;
        });
      });

      //неуспешный вход в систему c пустым паролем
      it('POST /login Войти в систему с пустым паролем 400 ' + nameOfUserObj, () => {
        //создание копии объекта данных пользователя
        let wrongUserCreds = Object.assign({}, userCreds);
        wrongUserCreds.password = '';

        authAPI.login(wrongUserCreds, false).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).a('string').not.empty;
          expect(response.body.timestamp).a('string').not.empty;
        });
      });

      //неуспешный вход в систему c пустым логином
      it('POST /login Войти в систему с пустым логином 400 ' + nameOfUserObj, () => {
        //создание копии объекта данных пользователя
        let wrongUserCreds = Object.assign({}, userCreds);
        wrongUserCreds.username = '';

        authAPI.login(wrongUserCreds, false).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).a('string').not.empty;
          expect(response.body.timestamp).a('string').not.empty;
        });
      });
    }

    //успешное удаление токена (выход из системы)
    it('DELETE /login{token} Удалить токен 204 ' + nameOfUserObj, () => {
      authAPI
        .login(userCreds)
        .then((response) => {
          cy.setCookie('auth_token', response.body.token);
          authAPI.deleteToken(response.body.token);
        })
        .then((response) => {
          expect(response.status).to.eq(204);
          expect(response.body).to.be.empty;
        });
    });

    //успешное получение пользователя по токену
    it('POST /login/remember-me Получить пользователя по токену 200 ' + nameOfUserObj, () => {
      authAPI
        .login(userCreds)
        .then((response) => {
          cy.setCookie('auth_token', response.body.token);
          userAuthInfoByAPI = response.body;
          authAPI.rememberMe(response.body.token);
        })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.id).a('number').eq(userAuthInfoByAPI.user.id);
          expect(response.body.fullName).a('string').eq(userAuthInfoByAPI.user.fullName);
          expect(response.body.username).a('string').eq(userAuthInfoByAPI.user.username);
        });
    });
  });
}
