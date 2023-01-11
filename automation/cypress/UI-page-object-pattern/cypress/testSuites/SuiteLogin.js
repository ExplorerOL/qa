import PageLogin from "../pages/PageLogin";
import PageLaborReports from "../pages/PageLaborReports/PageLaborReports";

export default class SuitLogin {
    constructor() {
        this.pageLogin = new PageLogin();
        this.pageLaborReports = new PageLaborReports();
    }
    //войти в систему с данными пользователя
    doLoginUserAndCheckVisibleElems(userData) {
        this.pageLaborReports = this.pageLogin.doNavigate().doLogin(userData);

        this.checkHeaderVisibleElems(userData)
            .checkSidebarVisibleElems(userData)
            .checkPageLaborReportVisibleElems();

        return this.pageLaborReports;
    }
    //войти в систему не заполняя логин
    doLoginWithoutLogin(userData) {
        this.pageLogin.doNavigate().doTypeInPassword(userData.password).doCLickBtnLogin();
        this.checkPageLoginVisibleElems().checkLblLoginIsRequiredVisible();
    }
    //войти в систему не заполняя пароль
    doLoginWithoutPassword(userData) {
        this.pageLogin.doNavigate().doTypeInLogin(userData.username).doCLickBtnLogin();
        this.checkPageLoginVisibleElems().checkLblPasswordIsRequiredVisible();
    }
    //войти в систему с неверными логином или паролем
    doLoginWithWrongCreds(userData) {
        this.pageLogin
            .doNavigate()
            .doTypeInLogin(userData.username)
            .doTypeInPassword(userData.password)
            .doCLickBtnLogin();
        this.checkPageLoginVisibleElems().checkLblWrongLoginOrPasswordVisible();
    }

    //выйти из системы через UI
    doLogoutUser() {
        return this.pageLaborReports.header.doLogout();
    }
    //выйти из системы через UI и проверить выход
    doLogoutAndCheckVisibleElems() {
        this.pageLaborReports.header.doLogout();
        this.checkPageLoginVisibleElems();
        return this.pageLogin;
    }

    //функции проверки страницы
    //проверка наличия элементов на странице
    checkPageLoginVisibleElems() {
        this.pageLogin.getPageLogo();
        this.pageLogin.getLblLoginUsingAccount().should("exist").and("be.visible");
        this.pageLogin.getInputLoginLabel().should("contain", "Логин");
        this.pageLogin.getInputPasswordLabel().should("contain", "Пароль");
        this.pageLogin.header.getBtnAuthUser().should("not.exist");
        cy.location("protocol").should("eq", "https:");
        return this;
    }
    //проверка видимости надписи об обязательности ввода логина
    checkLblLoginIsRequiredVisible() {
        this.pageLogin
            .getLblLoginIsRequired()
            .should("have.text", "Поле обязательно")
            .and("be.visible");
        return this;
    }
    //проверка видимости надписи об обязательности ввода пароля
    checkLblPasswordIsRequiredVisible() {
        this.pageLogin
            .getLblPasswordIsRequired()
            .should("have.text", "Поле обязательно")
            .and("be.visible");
        return this;
    }
    //проверка видимости надписи о неверном логине или пароле
    checkLblWrongLoginOrPasswordVisible() {
        this.pageLogin.getLblWrongLoginOrPassword().should("be.visible");
        return this;
    }

    //вспомогательные методы проверок
    //проверка элементов на странице
    checkPageLaborReportVisibleElems() {
        this.pageLaborReports.getTableWorkReportTitle().should("exist");
        this.pageLaborReports.getTableLeavePeriodsTitle().should("exist");
    }
    //проверка имени пользователя в правом верхнем улгу хэдера
    checkHeaderVisibleElems(userData) {
        this.pageLaborReports.header.getBtnAuthUser().contains(userData.username);
        return this;
    }
    //проверка общих для всех пользователей элементов сайдбара
    checkSidebarVisibleElems(userData) {
        this.pageLaborReports.sidebar.getMainBlockTitle().should("exist");
        this.pageLaborReports.sidebar.getItemLaborReport().should("exist");
        this.pageLaborReports.sidebar.getItemProjects().should("exist");
        this.pageLaborReports.sidebar.getItemUsers().should("exist");
        this.pageLaborReports.sidebar.getItemLeavePlan().should("exist");
        this.pageLaborReports.sidebar.getItemCalendar().should("exist");

        switch (userData.sysRole) {
            case "admin": {
                this.checkSidebarVisibleElemsA();
                break;
            }
            case "tech_assist": {
                this.checkSidebarVisibleElemsT();
                this.checkSidebarNotVisibleElemsT();
                break;
            }
            case "lead": {
                this.checkSidebarVisibleElemsL();
                this.checkSidebarNotVisibleElemsL();
                break;
            }
            case "user": {
                this.checkSidebarVisibleElemsU();
                this.checkSidebarNotVisibleElemsU();
                break;
            }
        }
        return this;
    }
    //проверка элементов администратора
    checkSidebarVisibleElemsA() {
        this.pageLaborReports.sidebar.getSidebarItems().should("have.length", 15);
        this.pageLaborReports.sidebar.getAdminBlockTitle().should("exist");
        this.pageLaborReports.sidebar.getItemAnalytics().should("exist");
        this.pageLaborReports.sidebar.getItemSummaryResPlan().should("exist");
        this.pageLaborReports.sidebar.getItemAdmPrjRoles().should("exist");
        this.pageLaborReports.sidebar.getItemAdmAssignSysRoles().should("exist");
        this.pageLaborReports.sidebar.getItemAdmUsers().should("exist");
        this.pageLaborReports.sidebar.getItemAdmProjects().should("exist");
        this.pageLaborReports.sidebar.getItemAdmSettings().should("exist");
        this.pageLaborReports.sidebar.getItemAdmIntegrations().should("exist");
        //this.pageLaborReports.sidebar.sidebar.getItemAdmAffiliates().should('exist');
        //this.pageLaborReports.sidebar.sidebar.getItemAdmKkPersonalQualities().should('exist');
    }
    //проверка элементов тех ассистента
    checkSidebarVisibleElemsT() {
        this.pageLaborReports.sidebar.getSidebarItems().should("have.length", 9);
        this.pageLaborReports.sidebar.getItemAnalytics().should("exist");
        this.pageLaborReports.sidebar.getItemAnalytics().should("exist");
        this.pageLaborReports.sidebar.getAdminBlockTitle().should("exist");
        this.pageLaborReports.sidebar.getItemAdmLogs().should("exist");
    }
    //проверка элементов лида
    checkSidebarVisibleElemsL() {
        this.pageLaborReports.sidebar.getSidebarItems().should("have.length", 8);
        this.pageLaborReports.sidebar.getItemAnalytics().should("exist");
        this.pageLaborReports.sidebar.getItemSummaryResPlan().should("exist");
        this.pageLaborReports.sidebar.getSidebar().should("not.contain", "Администрирование");
    }
    //проверка элементов пользователя
    checkSidebarVisibleElemsU() {
        this.pageLaborReports.sidebar.getSidebarItems().should("have.length", 6);
        this.pageLaborReports.sidebar.getAdminBlockTitle().should("not.exist");
    }

    //проверка отсутствия элементов адрминистратора в сайдбаре
    checkSidebarNotVisibleElemsL() {
        this.pageLaborReports.sidebar.getAdminBlockTitle().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmPrjRoles().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmAssignSysRoles().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmUsers().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmProjects().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmSettings().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmIntegrations().should("not.exist");
    }
    //проверка отсутствия элементов адрминистратора у тех. ассиста
    checkSidebarNotVisibleElemsT() {
        this.pageLaborReports.sidebar.getItemSummaryResPlan().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmPrjRoles().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmAssignSysRoles().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmUsers().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmProjects().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmSettings().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmIntegrations().should("not.exist");
    }
    //проверка отсутствия элементов адрминистратора у тех. ассиста
    checkSidebarNotVisibleElemsU() {
        this.pageLaborReports.sidebar.getItemAnalytics().should("not.exist");
        this.pageLaborReports.sidebar.getItemSummaryResPlan().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmPrjRoles().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmAssignSysRoles().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmUsers().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmProjects().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmSettings().should("not.exist");
        this.pageLaborReports.sidebar.getItemAdmIntegrations().should("not.exist");
    }
}
