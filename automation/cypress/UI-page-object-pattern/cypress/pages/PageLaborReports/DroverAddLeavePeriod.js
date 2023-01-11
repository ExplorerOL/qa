//локаторы страницы
const DROVER_ADD_LEAVE_PERIOD = '.MuiDrawer-paper',
    LBL_CHOOSE_DATES = "Выберите даты",
    LBL_START_DATE = "#mui-1-label",
    LBL_END_DATE = "#mui-2-label",
    DATAPICKER = '[data-testid="CalendarIcon"]',
    BTN_DATAPICKER_DAY = "button[role='gridcell']",
    INPUT_START_END_DATE = "input[class~='MuiInputBase-inputAdornedEnd']",
    //INPUT_END_DATE = "input[id='mui-1']",
    BTN_CANCEL = "button[class~='button'][type='button']",
    BTN_SAVE = "button[class~='onboarding__save-button'][type='submit']",
    BTN_CLOSE = "[data-testid='ClearIcon']";

export default class DroverAddSickPeriod {
    constructor() {
        this.title = null;
    }
//элементы страницы
    //окно дровера
    getDrowerWindow() {
        return cy.get(DROVER_ADD_LEAVE_PERIOD);
    }
    //название дровера
    getTitle() {
        return cy.contains('h4', this.title);
    }
    //задать название дровера
    setTitle(droverTitle) {
        this.title = droverTitle;
    }
    //текст выберите даты отпуска
    getDroverText() {
        return this.getDrowerWindow().contains('p', LBL_CHOOSE_DATES);
    }
    //получить название поля ввода даты начала
    getLblInputStartDate() {
        return cy.get(LBL_START_DATE);
    }
    //получить название поля ввода даты конца
    getLblInputEndDate() {
        return cy.get(LBL_END_DATE);
    }
    //датапикер начала периода
    getDatapickerStartDate() {
        return cy.get(DATAPICKER).first();
    }
    //датапикер конца периода
    getDatapickerEndDate() {
        return cy.get(DATAPICKER).last();
    }
    //поле ввода даты начала периода
    getInputStartDate() {
        return cy.get(INPUT_START_END_DATE).first();
    }
    //поле ввода даты конца периода
    getInputEndDate() {
        return cy.get(INPUT_START_END_DATE).last();
    }

    //кнопка Отмена
    getBtnCancel() {
        return cy.get(BTN_CANCEL);
    }
    //кнопка Сохранить
    getBtnSave() {
        return cy.get(BTN_SAVE);
    }
    //кнопка крестик Закрыть
    getBtnCancel() {
        return cy.get(BTN_CLOSE);
    }
    doOpenDatapicker(datapicker) {
        datapicker.click();
    }
    doSelectDayOfCurrentMonthFromDatapicker(dayCurrentMonth) {
        this.doOpenDatapicker(this.getDatapickerStartDate());
        cy.get(BTN_DATAPICKER_DAY).contains(dayCurrentMonth).click();
        return this;
    }
    doTypeEndDate(date) {
        this.getInputEndDate().clear().type(date);
        return this;
    }
    doClickBtnSave() {
        this.getBtnSave().click();
    }
 
//действия на странице
}

