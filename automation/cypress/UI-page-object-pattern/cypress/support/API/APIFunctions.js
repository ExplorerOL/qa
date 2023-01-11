
//логин
export function doLogin(userCreds) {
    return cy.request({
        method: "POST",
        url: "/api/login",
        body: {
            login: userCreds.username,
            password: userCreds.password,
        },
    });
}
//проверка успешности логина
export function checkLoginOK(loginResponseBody) {
    expect(loginResponseBody.status).to.eq(200);
    expect(loginResponseBody.body.token).to.not.be.null;
}

//выход из системы
export function doLogout(userData) {
    cy.request({
        method: "DELETE",
        url: "/api/login/" + cy.getCookie("auth_token"),
    })
        .then(function (response) {
            expect(response.status).to.eq(204);
        })
        .then(function (response) {
            return response;
        });
}

//получение всех периодов отсутствий
function getAllLeavePeriods(userInfo) {
    return cy.request({
        method: "GET",
        url: "/api/leave-periods/?userId=" + userInfo.user.id,
        body: { token: toString(cy.getCookie("auth_token")) },
    });
}

//удаление всех периодов отсутствий
export function deleteAllLeavePeriods(userInfo) {
    return getAllLeavePeriods(userInfo).then(function (response) {
        expect(response.status).to.eq(200);
        response.body.forEach((element) => {
            cy.request({
                method: "DELETE",
                url: "/api/leave-periods/" + element.id
            });
        });
    });
}

//добавление периода отсутствия
export function addLeavePeriod(userInfo, leavePeriodType, startDate, endDate) {
    return cy.request({
        method: "POST",
        url: "/api/leave-periods/",
        body: {
            reason: leavePeriodType,
            startDate: startDate,
            endDate: endDate,
            userId: userInfo.user.id,
        },
    });
}

//получение всех трудозатраты пользователя
function getAllLaborReports(startDate, endDate) {
    return cy.request({
        method: "GET",
        url: "/api/labor-reports?startDate=" + startDate + "&endDate=" + endDate
    });
}

//удаление всех трудозатрат пользователя
export function deleteAllLaborReports(startDate, endDate) {
    return getAllLaborReports(startDate, endDate).then(function (response) {
        expect(response.status).to.eq(200);
        response.body.forEach((element) => {
            cy.request({
                method: "DELETE",
                url: "/api/labor-reports/" + element.id
            });
        });
    });
}