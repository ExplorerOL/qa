//локаторы раздела Главная
const SIDEBAR = "ul[class*='MuiList-root']",
    LIST_GENERAL_FUNCTIONS = "//li[@class='MuiListItem-root MuiListItem-gutters css-hsebhl']",
    TITLE_MAIN_BLOCK = "Главная",
    TITLE_ADMIN_BLOCK = "Администрирование",
    //ссылки и иконки в элементах раздела сайдбара Главная
    ITEM_LABOR_REPORT = "a[href='/'] [data-testid='CreateIcon']",
    ITEM_PROJECTS = "a[href='/projects'] [data-testid='ViewColumnIcon']",
    ITEM_USERS = "a[href='/users'] [data-testid='PeopleAltIcon']",
    ITEM_ANALYTICS = "a[href='/pivot-table'] [data-testid='AssessmentIcon']",
    ITEM_SUMMARY_RES_PLAN = "a[href='/resource-plan-table'] [data-testid='AssessmentIcon']",
    ITEM_PLAN_LEAVE_PERIOD = "a[href='/vacation-schedule']",
    ITEM_PROD_CALENDAR = "a[href='/calendar'] [data-testid='EventIcon']",
    //ссылки и иконки в элементах раздела сайдбара Администрирование
    LIST_ADM_FUNCTIONS = 'li[class="MuiListItem-root MuiListItem-gutters css-l93goy"]',
    ITEM_ADM_PRJ_ROLES = "a[href='/admin/project-roles']",
    ITEM_ADM_ASSIGN_SYS_ROLES = "a[href='/admin/user-roles'] [data-testid='CreateNewFolderIcon']",
    ITEM_ADM_USERS = "a[href='/admin/users'] [data-testid='PeopleAltIcon']",
    ITEM_ADM_PROJECTS = "a[href='/admin/projects'] [data-testid='ViewColumnIcon']",
    ITEM_ADM_SETTINGS = "a[href='/admin/settings'] [data-testid='SettingsIcon']",
    ITEM_ADM_INTEGRATIONS = "a[href='/admin/integrations'] [data-testid='WidgetsIcon']",
    ITEM_ADM_LOGGING = "a[href='/admin/logging'] [data-testid='BuildIcon']";

// ITEM_ADM_LOGS = "//li//a[.='Логирование']",
// ITEM_ADM_AFFILIATES = "//li//a[.='Филиалы']",
// ITEM_ADM_PERSONAL_QUALITIES = "//li//a[.='Филиалы']";

export default class Sidebar {
    //элементы страницы
    //элемент сайдбара
    getSidebar() {
        return cy.get(SIDEBAR);
    }
    //список элементов сайдбара
    getSidebarItems() {
        return cy.get(SIDEBAR).find("li");
    }
    getMainBlockTitle() {
        return cy.get(SIDEBAR).contains(TITLE_MAIN_BLOCK);
    }
    //элемент Трудозатраты
    getItemLaborReport() {
        return cy.get(ITEM_LABOR_REPORT);
    }
    //элемент Проекты
    getItemProjects() {
        return cy.get(ITEM_PROJECTS);
    }
    //элемент Пользователи
    getItemUsers() {
        return cy.get(ITEM_USERS);
    }
    //элемент Аналитика
    getItemAnalytics() {
        return cy.get(ITEM_ANALYTICS);
    }
    //элемент Сводный ресурсный план
    getItemSummaryResPlan() {
        return cy.get(ITEM_SUMMARY_RES_PLAN);
    }
    //элемент График отпусков
    getItemLeavePlan() {
        return cy.get(ITEM_PLAN_LEAVE_PERIOD);
    }
    //элемент Произовдственный календать
    getItemCalendar() {
        return cy.get(ITEM_PROD_CALENDAR);
    }

    //блок элементов администратора
    getAdminBlockTitle() {
        return cy.get(SIDEBAR).contains(TITLE_ADMIN_BLOCK);
    }
    //элемент Проектные роли
    getItemAdmPrjRoles() {
        return cy.get(ITEM_ADM_PRJ_ROLES);
    }
    //элемент Назначение проектных ролей
    getItemAdmAssignSysRoles() {
        return cy.get(ITEM_ADM_ASSIGN_SYS_ROLES);
    }
    //элемент АПользователи
    getItemAdmUsers() {
        return cy.get(ITEM_ADM_USERS);
    }
    //элемент АПроекты
    getItemAdmProjects() {
        return cy.get(ITEM_ADM_PROJECTS);
    }
    //элемент Настройки
    getItemAdmSettings() {
        return cy.get(ITEM_ADM_SETTINGS);
    }
    //элемент Интеграции
    getItemAdmIntegrations() {
        return cy.get(ITEM_ADM_INTEGRATIONS);
    }
    // //элемент Филиалы
    // getItemAdmAffiliates() {
    //     return cy.xpath(ITEM_ADM_AFFILIATES);
    // }
    // //элемент КК Справочники
    // getItemAdmKkPersonalQualities() {
    //     return cy.xpath(ITEM_ADM_PERSONAL_QUALITIES);
    // }
    //элемент Логгирование
    getItemAdmLogs() {
        return cy.get(ITEM_ADM_LOGGING);
    }
    //действия на странице
}
