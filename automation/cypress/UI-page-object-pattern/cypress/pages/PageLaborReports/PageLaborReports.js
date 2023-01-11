import Header from "../Header.js";
import Sidebar from "../Sidebar.js";
import DroverAddLeavePeriod from "./DroverAddLeavePeriod.js";

//локаторы страницы
const ADD_ICON = '[data-testid="AddIcon"]',
    DELETE_ICON = '[data-testid="ClearIcon"]',
    ARROW_DROP_DOWN_ID = "[data-testid='ArrowDropDownIcon']",
    CHEVRON_LEFT_ID = "[data-testid='ChevronLeftIcon']",
    CHEVRON_RIGHT_ID = "[data-testid='ChevronRightIcon']",
    BTN_ADD_PROJECT_TITLE = "Проект",
    BTN_ADD_OVERTIME_PERIOD_TITLE = "Переработка",
    BTN_ADD_LEAVE_PERIOD_TITLE = "Отсутствие",
    BTN_SAVE_WORKING_HOURS = "//button[.='Сохранить']",
    BTN_CANCEL_WORKING_HOURS = "//button[.='Отмена']",
    TABLE_WORK_HOURS_TITLE = "//h4[.='Отчет трудозатрат']",
    TABLE_LEAVE_PERIODS_TITLE = "//h4[.='Отсутствие']",
    TABLE_LEAVE_PERIODS = ".ag-center-cols-container",
    MENU_ADD_LEAVE_PERIOD_ITEMS = "ul[role='menu'][class~='MuiMenu-list']",
    DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE = "Больничный",
    DROPDOWN_LEAVE_PEARIODS_ITEM_PLANNED_PERIOD_TITLE = "Ежегодный отпуск",
    DROPDOWN_LEAVE_PEARIODS_ITEM_ADMINISTRAVIVE_PERIOD_TITLE = "Административный отпуск",
    DROPDOWN_LEAVE_PEARIODS_ITEM_MATERNITY_PERIOD_TITLE = "Декретный отпуск",
    //элементы таблицы Трудозатраты
    TABLE_LABOR_REPORTS_ROWS_WITH_PROJECTS = 'div[class~="ag-row-first"][row-id="row-group-0"]',
    TABLE_LABOR_REPORTS_ROW_TOTAL = 'div[class~="ag-floating-bottom-viewport"][role="presentation"]',
    TABLE_LABOR_REPORTS_FIRST_ROW_1DAY_CELL =
        'div[class~="ag-row-first"][row-id="row-group-0"] div[class~="ag-cell-value"][role="gridcell"][aria-colindex="3"]',
    TABLE_LABOR_REPORTS_FIRST_PRJ_ROW_CELLS = 'div[row-id="row-group-0"] div[class~="cell-dates"][role="gridcell"]',
    TABLE_LABOR_REPORTS_TOTAL_ROW_CELLS =
        'div[row-index="b-0"][row-id="b-0"] div[class~="cell-dates"][role="gridcell"]',
    TABLE_AG_GRID = '[role="grid"]',
    TABLE_LABOR_REPORTS_DAY1_COLUMN = 'div[class~="ag-cell-value"][aria-colindex="3"]',
    TABLE_LABOR_REPORTS_DAY22_COLUMN = 'div[class~="ag-cell-value"][aria-colindex="24"]',
    //элементы таблицы Отсутствия
    TABLE_LEAVE_PERIODS_CELL_LAST_LEAVE_TYPE = 'div[role="gridcell"][col-id="0"]',
    TABLE_LEAVE_PERIODS_BTN_DELETE_LAST_LEAVE_PERIOD = 'div[role="gridcell"][col-id="3"] [data-testid="ClearIcon"]',
    MODAL_DELETE_LEAVE_PERIOD_BTN_DELETE = 'button[class~="onboaridng__comfirm-save-button"]';

export default class PageLaborReports {
    constructor() {
        this.header = new Header();
        this.sidebar = new Sidebar();
        this.menuAddLeavePeriod = null;
        this.droverAddLeavePeriod = new DroverAddLeavePeriod();
        //this.droverAddSickPeriod = new DroverAddSickPeriod();
    }

    //элементы страницы
    //кнопка добавления переработок
    getBtnAddOvertimePeriods() {
        //return cy.contains('button', BTN_ADD_OVERTIME_PERIOD_TITLE).find(ADD_ICON);
        return cy.contains("button", BTN_ADD_OVERTIME_PERIOD_TITLE).find(ADD_ICON);
    }
    //кнопка добавления отсутствий
    getBtnAddLeavePeriods() {
        return cy.contains("button", BTN_ADD_LEAVE_PERIOD_TITLE).find(ADD_ICON);
    }
    //кнопка добавления на проект
    getBtnAddProject() {
        return cy.contains("button", BTN_ADD_PROJECT_TITLE).find(ADD_ICON);
    }
    //кнопка сохранения рабочих часов
    getBtnSaveWorkingHours() {
        return cy.xpath(BTN_SAVE_WORKING_HOURS);
    }
    //кнопка отмены сохранения рабочих часов
    getBtnCancelWorkingHours() {
        return cy.xpath(BTN_CANCEL_WORKING_HOURS);
    }
    //название таблицы трудозатрат
    getTableWorkReportTitle() {
        return cy.xpath(TABLE_WORK_HOURS_TITLE);
    }
    //строки с проектами таблицы турдозатрат
    getTableLaborReportFirstPrjRowCells() {
        return cy.get(TABLE_LABOR_REPORTS_FIRST_PRJ_ROW_CELLS);
    }
    //строка Итого таблицы трудозатрат
    getTableLaborReportRowTotalCells() {
        return cy.get(TABLE_LABOR_REPORTS_TOTAL_ROW_CELLS);
    }
    //столбец таблицы трудозатрат для дня 1
    getTableLaborReportsColumnDay1() {
        return cy.get(TABLE_AG_GRID).first().find(TABLE_LABOR_REPORTS_DAY1_COLUMN);
    }
    //столбец таблицы трудозатрат для дня 22
    getTableLaborReportsColumnDay22() {
        return cy.get(TABLE_AG_GRID).first().find(TABLE_LABOR_REPORTS_DAY22_COLUMN);
    }

    //название раздела с отсутствиями
    getTableLeavePeriodsTitle() {
        return cy.xpath(TABLE_LEAVE_PERIODS_TITLE);
    }
    //таблица отсутствий
    getTableLeavePeriods() {
        return cy.get(TABLE_LEAVE_PERIODS);
    }
    //таблица отсутствий
    getTableLeavePeriodsCellFirstLeavePeriodType() {
        return cy.get(TABLE_LEAVE_PERIODS_CELL_LAST_LEAVE_TYPE);
    }
    getTableLeavePeriodsBtnDeleteFirstPeriod() {
        return cy.get(TABLE_LEAVE_PERIODS_BTN_DELETE_LAST_LEAVE_PERIOD);
    }
    getModalDeleteLeavePeriodBtnDelete() {
        return cy.get(MODAL_DELETE_LEAVE_PERIOD_BTN_DELETE);
    }


//действия на странице
    //перейти на страницу
    doNavigate() {
        cy.intercept("/api/leave-periods*").as("APIgetLeavePeriods");
        cy.intercept("/api/labor-reports/**/*").as("APIgetLaborReports");
        cy.visit("/");
        this.header.getBtnAuthUser().should("exist");
        return this;
    }
    //ожидать ответа от API трудозатрат и отсутствий
    doWaitForAPILeavePeriodsANDLaborReportsResponse() {
        cy.wait(["@APIgetLeavePeriods", "@APIgetLaborReports"]);
    }
    //ожидать ответа от API отсутствий
    doWaitForAPILeavePeriodsResponse() {
        cy.wait("@APIgetLeavePeriods");
    }
    //ожидать ответа от API трудозатрат
    doWaitForAPILaborReportsResponse() {
        cy.wait("@APIgetLaborReports");
    }
    //открыть меню добавления прериода отсутствия
    doOpenMenuAddLeavePeriod() {
        this.getBtnAddLeavePeriods().click();
        this.menuAddLeavePeriod = cy.get(MENU_ADD_LEAVE_PERIOD_ITEMS);
        return this.menuAddLeavePeriod;
    }

    //открыть дровер добавления отсутствия
    doOpenDroverAddLeavePeriod(leavePeriodType) {
        let dropdownAddLeavePerionItem;
        switch (leavePeriodType) {
            case "SIC": {
                dropdownAddLeavePerionItem = DROPDOWN_LEAVE_PEARIODS_ITEM_SICK_PERIOD_TITLE;
                break;
            }
            case "VAC": {
                dropdownAddLeavePerionItem = DROPDOWN_LEAVE_PEARIODS_ITEM_PLANNED_PERIOD_TITLE;
                break;
            }
            case "ADM": {
                dropdownAddLeavePerionItem = DROPDOWN_LEAVE_PEARIODS_ITEM_ADMINISTRAVIVE_PERIOD_TITLE;
                break;
            }
            case "MAT": {
                dropdownAddLeavePerionItem = DROPDOWN_LEAVE_PEARIODS_ITEM_MATERNITY_PERIOD_TITLE;
            }
        }

        this.menuAddLeavePeriod = this.doOpenMenuAddLeavePeriod();
        this.menuAddLeavePeriod.contains(dropdownAddLeavePerionItem).click();

        return this.droverAddLeavePeriod.setTitle(dropdownAddLeavePerionItem);
    }
    //удалить период отсутствия в самой верхней строке таблицы
    doDeleteLastLeavePeriod() {
        this.getTableLeavePeriodsBtnDeleteFirstPeriod().click();
        this.getModalDeleteLeavePeriodBtnDelete().click();
        return this;
    }
}
