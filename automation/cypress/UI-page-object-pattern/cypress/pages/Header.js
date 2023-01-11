import PageLogin from "./PageLogin";

//локаторы страницы
const BTN_AUTH_USER = "button[class*='MuiButton-disableElevation']",
    ICON_AUTH_USER = '[data-testid="PersonIcon"]',
    LOGO = "//a[@href='/']",
    AUTH_USER_MENU_LOGOUT = "//li[.='Выйти']";

export default class Header {
    //элементы страницы
    //кнопка с именем пользователя в правом верхнем углу
    getBtnAuthUser() {
        return cy.get(BTN_AUTH_USER);
    }
    //иконка пользователя в правом верхнем углу
    getIconAuthUser() {
        return cy.get(ICON_AUTH_USER);
    }
    //логотип в левом верхнем углу
    getLogo() {
        return cy.xpath(LOGO);
    }
    //кнопка выхода из системы
    getAuthUserMenuLogout() {
        return cy.xpath(AUTH_USER_MENU_LOGOUT);
    }

    //действия на странице
    //выход из системы через UI
    doLogout() {
        cy.log("Выход из системы");
        if (this.getIconAuthUser()) {
            this.getIconAuthUser().click();
            this.getAuthUserMenuLogout().click();
        }
        let pageLogin = new PageLogin();
        return pageLogin;
    }
}
