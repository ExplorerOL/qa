import Header from "./Header";
import PageLaborReports from "./PageLaborReports/PageLaborReports";

//локаторы
const IMG_PAGE_LOGO = "svg[data-testid='LockIcon']",
    LBL_LOGIN_USING_ACCOUNT = "//p[.='Введите свои учётные данные']",
    INPUT_LOGIN_LABEL = "#mui-1-label",
    INPUT_PASSWORD_LABEL = "#mui-2-label",
    INPUT_LOGIN = "input[name='login']",
    INPUT_PASSWORD = "input[name='password']",
    BTN_LOGIN = "button[class*='MuiButton-containedSecondary'][type='submit']",
    LBL_LOGIN_REQUIRED = "p[id='mui-1-helper-text']",
    LBL_PASSWORD_REQUIRED = "p[id='mui-2-helper-text']",
    LBL_WRONG_LOGIN_OR_PASSWORD = "Неверный",
    STYLE_LBL_WRONG_LOGIN_OR_PASSWORD = ".css-ifn6vo";

export default class PageLogin {
    constructor() {
        this.header = new Header();
    }

    //элементы страницы
    //текст приглашения о вводе учетных данных
    getPageLogo() {
        return cy.get(IMG_PAGE_LOGO);
    }
    //текст приглашения о вводе учетных данных
    getLblLoginUsingAccount() {
        return cy.xpath(LBL_LOGIN_USING_ACCOUNT);
    }
    //текст-заглушка в поле логин
    getInputLoginLabel() {
        return cy.get(INPUT_LOGIN_LABEL);
    }
    //текст-заглушка в поле пароль
    getInputPasswordLabel() {
        return cy.get(INPUT_PASSWORD_LABEL);
    }
    //поле пароль
    getInputLogin() {
        return cy.get(INPUT_LOGIN);
    }
    //поле логин
    getInputPassword() {
        return cy.get(INPUT_PASSWORD);
    }
    //кнопка логин
    getBtnLogin() {
        return cy.get(BTN_LOGIN);
    }
    //надпись логин обязателен
    getLblLoginIsRequired() {
        return cy.get(LBL_LOGIN_REQUIRED);
    }
    //надпись пароль обязателен
    getLblPasswordIsRequired() {
        return cy.get(LBL_PASSWORD_REQUIRED);
    }
    //надпись логин или пароль неверные
    getLblWrongLoginOrPassword() {
        return cy.contains(STYLE_LBL_WRONG_LOGIN_OR_PASSWORD, LBL_WRONG_LOGIN_OR_PASSWORD);
    }

    //действия на странице
    //открыть страницу и проверить наличие ее элементов
    doNavigate() {
        cy.visit("/login");
        return this;
    }
    //нажать кнопку Логин
    doCLickBtnLogin() {
        this.getBtnLogin().click();
        return this;
    }
    //ввести тест в поле логин
    doTypeInLogin(text) {
        this.getInputLogin().type(text);
        return this;
    }
    //ввести тест в поле пароль
    doTypeInPassword(text) {
        this.getInputPassword().type(text);
        return this;
    }
    //процедура логина через UI
    doLogin(userData) {
        this.doTypeInLogin(userData.username).doTypeInPassword(userData.password).doCLickBtnLogin();
        let pageLaborReports = new PageLaborReports();
        return pageLaborReports;
    }
}
