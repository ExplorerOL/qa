## Автотесты системы СУТ с использованием фреймворка Cypress v10

В тестах используется переменная окружения `userForTest`. С ее помощью можно задавать выполнение тестов для конкретного пользователя или для всех: `admin, lead, tech_assist, user, all`. При запуске из командной строки задать нужно задать пользователя так: `--env userForTest=tech_assist`. 
При работе в графическом режеме отладки, значение этой переменной берется из файла конфигурации `cypress.env.json`. Пример содержания файла `cypress.env.json`:
```
{
    "userForTest": "admin"
}
```
Для запуска фреймворка Cypress в графическом режиме отладки нужно из директории репозитория выполнить команду (для Windows):
```
    ./node_modules/.bin/cypress open
```

Для запуска тестов из командной строки использовать команду:
```
    ./node_modules/.bin/cypress run --browser chrome --env userForTest=tech_assist --config video=false
```

По умолчанию Cypress будет выполнять все тесты из директории `e2e`. Если нужно выполнить тесты из конкретного файла, то можно указать опцию `--spec=<имя_файла_с_путем>`. 
Для отключения записи видео использовать опцию `--config video=false`.
Для указания браузера использовать опцию `--browser chrome`.
Если при запуске из командной строки нужно открывать окно браузера, то для этого задать опцию `--headed`.

Пример выполнения всех тестов для всех пользователей в браузере Chrome без записи видео:
```
    ./node_modules/.bin/cypress run --browser chrome --env userForTest=all --config video=false
```

Пример выполнения всех тестов для пользователя `user` в браузере Chrome без записи видео:
```
    ./node_modules/.bin/cypress run --browser chrome --env userForTest=user --config video=false
```

Пример выполнения заданных тестов для пользователя `user` в браузере Chrome без записи видео:
```
    ./node_modules/.bin/cypress run --browser chrome --env userForTest=user --spec=./cypress/e2e/authorizationN/authorizationN.cy.js --config video=false
```