import printLogInReport from 'mochawesome/addContext';

//команда вывода текста в отчет mochawsome
Cypress.Commands.add('printLogInReport', (context) => {
  cy.once('test:after:run', (test) => printLogInReport({ test }, context));
});
