// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-xpath';

import * as helpers from './helpers.js';
import * as helpersAPI from './helpersAPI.js';

//файл с набором валидных учетных записей
import creds from '../fixtures/validUserCreds.json';

//вспомогательные переменные
const currentMonthStartDate = helpers.calculateCurrentMonthStartDate();

//глобальные переменные
global.userAuthInfoByAPI = '';
global.currentMonthStartDate = helpers.calculateCurrentMonthStartDate();
global.currentMonthEndDate = helpers.calculateCurrentMonthEndDate();
global.currentDate = helpers.calculateCurrentDate();

global.helpers = helpers;
global.helpersAPI = helpersAPI;
global.creds = creds;

// Alternatively you can use CommonJS syntax:
// require('./commands')
