export function generateRandomString(strLength) {
  let rndString = '';
  let symbols =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789АБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщэюя ~!@#$%^&*()-="№;:*_';
  for (let i = 0; i < strLength; i++) {
    rndString += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  //вывод в терминал
  cy.task('log', 'Generated string = ' + rndString);
  //вывод в отчет mochawsome
  cy.printLogInReport('Generated string = ' + rndString);
  return rndString;
}

//определение даты первого дня текущего месяца
export function calculateCurrentMonthStartDate() {
  let now = new Date();
  let firstDay = '01';
  let nowMonth = ('0' + (now.getMonth() + 1)).slice(-2);
  let nowYear = now.getFullYear();
  let firstDayDate = nowYear + '-' + nowMonth + '-' + firstDay;
  return firstDayDate;
}

//определение даты последнего дня текущего месяца
export function calculateCurrentMonthEndDate() {
  let now = new Date();

  let nowMonth = ('0' + (now.getMonth() + 1)).slice(-2);
  let nowYear = now.getFullYear();

  //получаем дату последнего дня текущего месяца в развернутом формате
  let lastDay = new Date(nowYear, nowMonth, 0);
  //преобразуем день к формату DD
  lastDay = ('0' + lastDay.getDate()).slice(-2);

  let lastDayDate = nowYear + '-' + nowMonth + '-' + lastDay;
  return lastDayDate;
}

//определение текущей даты
export function calculateCurrentDate() {
  let now = new Date();
  let nowDay = ('0' + now.getDate()).slice(-2);
  let nowMonth = ('0' + (now.getMonth() + 1)).slice(-2);
  let nowYear = now.getFullYear();
  let currentDate = nowYear + '-' + nowMonth + '-' + nowDay;
  return currentDate;
}

//генерирование отработанного времени от 1 до 24 часов
export function generateWorkHours() {
  let workHours = Math.floor(Math.random() * 24 + 1);
  //вывод в терминал
  cy.task('log', 'Work hours = ' + workHours);
  //вывод в отчет mochawsome
  cy.printLogInReport('Work hours = ' + workHours);
  return workHours;
}
