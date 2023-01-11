import SuitLogin from "../../testSuites/suiteLogin.js";

//файл с набором валидных учетных записей
const creds = require("../../fixtures/wrongUserCreds");

describe("Негативные тесты авторизации", () => {
    beforeEach(() => {
        localStorage.setItem("sut/onboardingStatus", '{"LaborCostsOnboardingFinished":true}');
    });

    let suitLogin = new SuitLogin();
    let userData;

    //-------------- Негативные проверки ---------------
    it("Вход с пустым логином", () => {
        userData = creds.user_empty_login;
        //логин через UI
        suitLogin.doLoginWithoutLogin(userData);
    });
    it("Вход с пустым паролем", () => {
        userData = creds.user_empty_password;
        //логин через UI
        suitLogin.doLoginWithoutPassword(userData);
    });
    it("Вход с неправильным логином", () => {
        userData = creds.wrong_login_user;
        //логин через UI
        suitLogin.doLoginWithWrongCreds(userData);
    });
    it("Вход с неправильным паролем", () => {
        userData = creds.wrong_password_user;
        //логин через UI
        suitLogin.doLoginWithWrongCreds(userData);
    });
});
