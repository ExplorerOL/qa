--очищаем все существующие таблицы
truncate users,assignments,labor_reports, leave_periods, project_roles, tokens,user_allowed_project_roles,variable_values,roles,slots,busy_percentages, user_roles,projects, kk_profiles, bitbucket_projects, confluence_spaces,
jira_projects, kk_experiences, kk_labels, testit_projects,kk_admin, kk_certificates, kk_workplaces, kk_education, kk_post_roles, kk_notes, kk_profile_qualities, kk_departments, kk_schedule, kk_schedule_time, kk_experiences_skills,
kk_profiles, logs, labor_reports_tasks_stages, slots_tasks, stage_statuses, stages, task_links, task_statuses, tasks, affiliates, kk_contacts, kk_resumes, kk_search, kk_posts;

--------------------- Исходные данные -----------------------------

-- создание вспомогательной таблицы с данными по пользователям
DROP TABLE IF EXISTS user_data; 
CREATE TABLE user_data (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(255) NOT NULL, 
    user_password varchar(255) NOT NULL,
    user_name varchar(255) NOT NULL,
    second_name varchar(255) NOT NULL,
    third_name varchar(255),
    phone varchar(255),
    email varchar(255),
    user_type varchar(255),
    birth_date timestamptz,
    start_work_date timestamptz,
    dismissal_date timestamptz,
    system_role varchar(255),
    kk_post varchar(255),
    kk_status varchar(255),
    kk_marital_status varchar(255),
    kk_edu_type varchar(255),
    kk_edu_direction varchar(255),
    kk_working_time_start int4,
    kk_working_time_end int4,
    kk_department varchar(255),
    project varchar(255),
    project_role varchar(255),
    is_project_manager bool,
    busy_percentage int4
);

ALTER SEQUENCE users_id_seq RESTART WITH 1; -- сброс id в 1
--заполнение вспомогательной таблицы исходными данными пользователей
INSERT INTO  user_data (username,	user_password,	user_name,	second_name,	third_name,	phone,	email,	user_type,	birth_date,	start_work_date,	dismissal_date,	system_role,	kk_post,	kk_status,	kk_marital_status,	kk_edu_type,	kk_edu_direction,	kk_working_time_start,	kk_working_time_end,	kk_department,	project,	project_role,	is_project_manager,	busy_percentage)
    VALUES
('user',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Виктория',	'Голубева',	'Владимировна',	'+7 (000) 123 45 01',	'golubeva.v@user-02.ru',	'local',	'1990-11-22',	'2018-02-04',	null,	'',	'Младший специалист',	'WORK',	'MARRIED',	'FULL_TIME',	'TECHNICAL',	'8',	'17',	'Отдел дизайна',	'Разработка СЭД',	'Дизайнер',	'false',	25),
('user',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Виктория',	'Голубева',	'Владимировна',	'+7 (000) 123 45 01',	'golubeva.v@user-02.ru',	'local',	'1990-11-22',	'2018-02-04',	null,	'',	'Младший специалист',	'WORK',	'MARRIED',	'FULL_TIME',	'TECHNICAL',	'8',	'17',	'Отдел дизайна',	'Модернизация АИС',	'Дизайнер',	'false',	50),
('user',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Виктория',	'Голубева',	'Владимировна',	'+7 (000) 123 45 01',	'golubeva.v@user-02.ru',	'local',	'1990-11-22',	'2018-02-04',	null,	'',	'Младший специалист',	'WORK',	'MARRIED',	'FULL_TIME',	'TECHNICAL',	'8',	'17',	'Отдел дизайна',	'Офисные нужды',	'Дизайнер',	'false',	10),
('user',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Виктория',	'Голубева',	'Владимировна',	'+7 (000) 123 45 01',	'golubeva.v@user-02.ru',	'local',	'1990-11-22',	'2018-02-04',	null,	'',	'Младший специалист',	'WORK',	'MARRIED',	'FULL_TIME',	'TECHNICAL',	'8',	'17',	'Отдел дизайна',	'Разработка сайта',	'Дизайнер',	'false',	25),
('admin',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Александр',	'Морозов',	'Степанович',	'+7 (000) 123 45 02',	'morozov.a@admin-03-08.ru',	'local',	'1980-02-12',	'2016-02-17',	null,	'админ',	'Исполнительный директор',	'WORK',	'MARRIED',	'DISTANCE',	'TECHNICAL',	'10',	'19',	'Отдел разработки',	'Модернизация АИС',	'Разработчик',	'false',	100),
('admin',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Александр',	'Морозов',	'Степанович',	'+7 (000) 123 45 02',	'morozov.a@admin-03-08.ru',	'local',	'1980-02-12',	'2016-02-17',	null,	'админ',	'Исполнительный директор',	'WORK',	'MARRIED',	'DISTANCE',	'TECHNICAL',	'10',	'19',	'Отдел разработки',	'Обучение стажеров',	'Руководитель разработки',	'true',	100),
('lead',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Елена',	'Чижова',	'Фёдоровна',	'+7 (000) 123 45 03',	'chizhova.e@lead-04-09.ru',	'local',	'1986-05-16',	'2016-12-15',	null,	'лид',	'Ведущий специалист',	'WORK',	'MARRIED',	'FULL_TIME',	'TECHNICAL',	'8',	'17',	'Отдел тестирования',	'Модернизация АИС',	'Руководитель тестирования',	'true',	100),
('lead',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Елена',	'Чижова',	'Фёдоровна',	'+7 (000) 123 45 03',	'chizhova.e@lead-04-09.ru',	'local',	'1986-05-16',	'2016-12-15',	null,	'лид',	'Ведущий специалист',	'WORK',	'MARRIED',	'FULL_TIME',	'TECHNICAL',	'8',	'17',	'Отдел тестирования',	'Обучение стажеров',	'Тестировщик',	'false',	75),
('assist',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Максим',	'Королёв',	'Сергеевич',	'+7 (000) 123 45 04',	'korolev.m@assist-03.ru',	'local',	'1996-09-25',	'2016-07-25',	null,	'технический ассистент',	'Специалист',	'WORK',	'MARRIED',	'DISTANCE',	'TECHNICAL',	'8',	'17',	'Отдел разработки',	'Разработка СЭД',	'Разработчик',	'false',	50),
('assist',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Максим',	'Королёв',	'Сергеевич',	'+7 (000) 123 45 04',	'korolev.m@assist-03.ru',	'local',	'1996-09-25',	'2016-07-25',	null,	'технический ассистент',	'Специалист',	'WORK',	'MARRIED',	'DISTANCE',	'TECHNICAL',	'8',	'17',	'Отдел разработки',	'Модернизация АИС',	'Разработчик',	'false',	75),
('assist',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Максим',	'Королёв',	'Сергеевич',	'+7 (000) 123 45 04',	'korolev.m@assist-03.ru',	'local',	'1996-09-25',	'2016-07-25',	null,	'технический ассистент',	'Специалист',	'WORK',	'MARRIED',	'DISTANCE',	'TECHNICAL',	'8',	'17',	'Отдел разработки',	'Разработка сайта',	'Разработчик',	'false',	100),
('fedotova',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Амина',	'Федотова',	'Никитична',	'+7 (000) 123 45 05',	'fedotova.f@lead-01-06.ru',	'local',	'1995-06-02',	'2015-08-25',	null,	'лид',	'Администратор проектов',	'WORK',	'MARRIED',	'FULL_TIME',	'TECHNICAL',	'8',	'17',	'Отдел аналитики',	'Разработка СЭД',	'Руководитель аналитики',	'true',	100),
('fedotova',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Амина',	'Федотова',	'Никитична',	'+7 (000) 123 45 05',	'fedotova.f@lead-01-06.ru',	'local',	'1995-06-02',	'2015-08-25',	null,	'лид',	'Администратор проектов',	'WORK',	'MARRIED',	'FULL_TIME',	'TECHNICAL',	'8',	'17',	'Отдел аналитики',	'Обучение стажеров',	'Аналитик',	'false',	25),
('popov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Иван',	'Попов',	'Ильич',	'+7 (000) 123 45 06',	'popov.i@user-05.ru',	'local',	'1995-07-25',	'2020-03-11',	null,	'',	'Старший специалист',	'WORK',	'MARRIED',	'DISTANCE',	'TECHNICAL',	'8',	'17',	'Отдел инфраструктуры',	'Разработка СЭД',	'Девопс',	'false',	25),
('popov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Иван',	'Попов',	'Ильич',	'+7 (000) 123 45 06',	'popov.i@user-05.ru',	'local',	'1995-07-25',	'2020-03-11',	null,	'',	'Старший специалист',	'WORK',	'MARRIED',	'DISTANCE',	'TECHNICAL',	'8',	'17',	'Отдел инфраструктуры',	'Модернизация АИС',	'Девопс',	'false',	75),
('popov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Иван',	'Попов',	'Ильич',	'+7 (000) 123 45 06',	'popov.i@user-05.ru',	'local',	'1995-07-25',	'2020-03-11',	null,	'',	'Старший специалист',	'WORK',	'MARRIED',	'DISTANCE',	'TECHNICAL',	'8',	'17',	'Отдел инфраструктуры',	'Офисные нужды',	'Девопс',	'false',	10),
('gorohova',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'София',	'Горохова',	'Марковна',	'+7 (000) 123 45 07',	'gorohova.s@admin-05.ru',	'local',	'1985-02-18',	'2015-11-06',	null,	'админ',	'Директор по персоналу',	'WORK',	'MARRIED',	'FULL_TIME',	'TECHNICAL',	'10',	'19',	'Отдел инфраструктуры',	'Офисные нужды',	'Девопс',	'true',	10),
('matveeva',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Анна',	'Матвеева',	'Данииловна',	'+7 (000) 123 45 08',	'matveeva.a@assist-03.ru',	'local',	'1993-04-12',	'2016-12-30',	null,	'технический ассистент',	'Администратор проектов',	'WORK',	'MARRIED',	'DISTANCE',	'TECHNICAL',	'8',	'17',	'Отдел разработки',	'Разработка СЭД',	'Разработчик',	'false',	100),
('golikov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Максим',	'Голиков',	'Максимович',	'+7 (000) 123 45 09',	'golikov.m@lead-02-07.ru',	'local',	'1980-01-25',	'2015-08-13',	null,	'лид',	'Директор по развитию',	'WORK',	'MARRIED',	'FULL_TIME',	'HUMANITARIAN',	'10',	'19',	'Отдел дизайна',	'Разработка СЭД',	'Руководитель дизайна',	'true',	50),
('golikov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Максим',	'Голиков',	'Максимович',	'+7 (000) 123 45 09',	'golikov.m@lead-02-07.ru',	'local',	'1980-01-25',	'2015-08-13',	null,	'лид',	'Директор по развитию',	'WORK',	'MARRIED',	'FULL_TIME',	'HUMANITARIAN',	'10',	'19',	'Отдел дизайна',	'Разработка сайта',	'Дизайнер',	'true',	75),
('baranov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Михаил',	'Баранов',	'Игоревич',	'+7 (000) 123 45 10',	'baranov.m@user-01.ru',	'local',	'1983-06-07',	'2016-04-15',	null,	'',	'Младший специалист',	'WORK',	'MARRIED',	'DISTANCE',	'HUMANITARIAN',	'8',	'17',	'Отдел аналитики',	'Разработка СЭД',	'Аналитик',	'false',	10),
('baranov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Михаил',	'Баранов',	'Игоревич',	'+7 (000) 123 45 10',	'baranov.m@user-01.ru',	'local',	'1983-06-07',	'2016-04-15',	null,	'',	'Младший специалист',	'WORK',	'MARRIED',	'DISTANCE',	'HUMANITARIAN',	'8',	'17',	'Отдел аналитики',	'Модернизация АИС',	'Аналитик',	'false',	100),
('sokolova',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Варвара',	'Соколова',	'Платоновна',	'+7 (000) 123 45 11',	'sokolova.v@user-01.ru',	'local',	'1993-04-19',	'2019-07-12',	null,	'',	'Бухгалтер',	'WORK',	'MARRIED',	'FULL_TIME',	'HUMANITARIAN',	'8',	'17',	'Отдел аналитики',	'Модернизация АИС',	'Аналитик',	'false',	50),
('zotov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Илья',	'Зотов',	'Миронович',	'+7 (000) 123 45 12',	'zotov.i@user-05.ru',	'local',	'1998-01-07',	'2021-11-01',	null,	'',	'Младший специалист',	'WORK',	'MARRIED',	'DISTANCE',	'HUMANITARIAN',	'8',	'17',	'Отдел инфраструктуры',	'Модернизация АИС',	'Девопс',	'false',	10),
('zolotareva',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Марьяна',	'Золотарева',	'Тимофеевна',	null,	'zolotareva.m@user-01.ru',	'local',	'1982-03-29',	'2016-05-25',	'2017-07-18',	'',	'Специалист',	'WORK',	'MARRIED',	'FULL_TIME',	'HUMANITARIAN',	'8',	'17',	'Отдел аналитики',	'Разработка сайта',	'Аналитик',	'false',	50),
('kudryashov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Лука',	'Кудряшов',	'Степанович',	null,	'kudryashov.l@lead-04.ru',	'local',	'1988-12-14',	'2017-02-24',	null,	'лид',	'Ведущий специалист',	'WORK',	'MARRIED',	'DISTANCE',	'HUMANITARIAN',	'8',	'17',	'Отдел тестирования',	'Разработка СЭД',	'Тестировщик',	'false',	100),
('kudryashov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Лука',	'Кудряшов',	'Степанович',	null,	'kudryashov.l@lead-04.ru',	'local',	'1988-12-14',	'2017-02-24',	null,	'лид',	'Ведущий специалист',	'WORK',	'MARRIED',	'DISTANCE',	'HUMANITARIAN',	'8',	'17',	'Отдел тестирования',	'Разработка сайта',	'Тестировщик',	'false',	100),
('denisov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Арсений',	'Денисов',	'Львович',	null,	'denisov.a@assist-05-10.ru',	'local',	'1989-05-16',	'2016-09-05',	null,	'',	'Главный специалист',	'WORK',	'MARRIED',	'FULL_TIME',	'HUMANITARIAN',	'8',	'17',	'Отдел инфраструктуры',	'Разработка СЭД',	'Девопс',	'false',	75),
('denisov',	'$2a$10$aKCtVCqalCxT.j1gD/MG0OyTi8lqeqnKSNm2G8zXH5wuwoxWUwfha',	'Арсений',	'Денисов',	'Львович',	null,	'denisov.a@assist-05-10.ru',	'local',	'1989-05-16',	'2016-09-05',	null,	'',	'Главный специалист',	'WORK',	'MARRIED',	'FULL_TIME',	'HUMANITARIAN',	'8',	'17',	'Отдел инфраструктуры',	'Обучение стажеров',	'Руководитель автоматизации',	'false',	25)
RETURNING *;

--заполнение таблицу "Проекты"
ALTER SEQUENCE projects_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO projects ("name", code, start_date, end_date, archived)
    VALUES 
        ('Разработка СЭД',  'СЭД',  '2017-09-01',   null,   'false'),
        ('Модернизация АИС',    'АИС-01',   '2020-08-10',   '2025-12-30',   'false'),
        ('Офисные нужды',   'OFFICE',   '2015-11-10',   null,   'false'),
        ('Обучение стажеров',   'INT-2022', '2019-01-01',   null,   'false'),
        ('Разработка сайта',    'SITE', '2016-06-01',   '2017-12-30',   'false')
RETURNING *;

--заполняем таблицу системных ролей
ALTER SEQUENCE roles_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO roles ("name", name_localized)
    VALUES
        ('admin',   'админ'),
        ('lead',    'лид'),
        ('technical-assistant', 'технический ассистент')
RETURNING *;

--заполняем таблицу проектных ролей
ALTER SEQUENCE project_roles_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO project_roles  (name, attraction_rate, salary_rate, color)
    VALUES 
    ('Аналитик',    '1000', '500',  '#eb3f3f'),
    ('Дизайнер',    '1000', '500',  '#599949'),
    ('Разработчик', '1000', '500',  '#a6a633'),
    ('Тестировщик', '1000', '500',  '#564aa0'),
    ('Девопс',  '1000', '500',  '#bb2792'),
    ('Руководитель аналитики',  '1000', '500',  '#cd8127'),
    ('Руководитель дизайна',    '1000', '500',  null),
    ('Руководитель разработки', '1000', '500',  null),
    ('Руководитель тестирования',   '1000', '500',  null),
    ('Руководитель автоматизации',  '1000', '500',  null)
RETURNING *;



--------------------- Заполнение остальных таблиц базы данных -----------------------------

--заполняем таблицы данных пользователей users
INSERT INTO users (username, "password", "name", second_name, third_name, phone, email, "type", birth_date, start_work_date, dismissal_date)
SELECT DISTINCT username, user_password, user_name, second_name, third_name, phone, email, user_type, birth_date, start_work_date, dismissal_date FROM user_data;


--заполнение таблицы системных ролей user_roles
ALTER SEQUENCE user_roles_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO user_roles (user_id, role_id)
    SELECT DISTINCT users.id, roles.id FROM users
    JOIN user_data ON users.username = user_data.username
    JOIN roles ON user_data.system_role  = roles.name_localized;

-- заполнение таблицы проектных ролей user_allowed_projects_roles
ALTER SEQUENCE user_allowed_project_roles_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO user_allowed_project_roles (user_id, project_role_id)
    SELECT DISTINCT users.id, project_roles.id FROM user_data
    JOIN users ON user_data.username = users.username  
    JOIN project_roles ON user_data.project_role = project_roles."name";  


-- заполнение таблицы cлотов slots
ALTER SEQUENCE slots_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO slots (role_id, project_id)
    SELECT project_roles.id AS prj_role_id, projects.id AS prj_id FROM user_data
    JOIN project_roles ON user_data.project_role = project_roles."name" 
    JOIN projects ON user_data.project = projects."name";

-- заполнение таблицы назначения assignments
-- назначения плохо работают при наличии на проекте больше одной одинаковой роли
-- при количестве одинаковых ролей на проекте больше 2 назначается не все слоты
-- при количестве двух одинаковых ролей на проекте тоже иногда возникают пропуски назначения
ALTER SEQUENCE assignments_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO assignments (slot_id, project_id, role_id, user_id, is_project_manager)
    SELECT DISTINCT ON (t_assign.slot_id) * FROM (
        SELECT DISTINCT ON (projects.id, project_roles.id, users.id) slots.id AS slot_id, projects.id AS project_id, project_roles.id AS project_role_id, users.id AS user_id, user_data.is_project_manager FROM slots
        JOIN projects ON slots.project_id  = projects.id
        JOIN project_roles ON slots.role_id = project_roles.id 
        JOIN user_data ON projects."name" = user_data.project AND project_roles."name" = user_data.project_role 
        JOIN users ON users.username = user_data.username
    ) AS t_assign;


-- заполнение таблицы busy_percentages (ресурсный план)
-- вспомогательные функции

-- функция получения даты начала проекта по номеру проекта
CREATE OR REPLACE FUNCTION find_prj_start_date(prj_id int) RETURNS date AS $$
    BEGIN 
        RETURN (
            SELECT DISTINCT projects.start_date FROM projects
                WHERE projects.id = prj_id
        );
    END;
$$ LANGUAGE plpgsql;

-- функция получения даты окончания проекта по номеру проекта
CREATE OR REPLACE FUNCTION find_prj_end_date(prj_id int) RETURNS date AS $$
    DECLARE
        end_date date;
    BEGIN 
        end_date = (SELECT DISTINCT projects.end_date FROM projects
                        WHERE projects.id = prj_id);
        IF (end_date IS NULL) THEN end_date = '2099-12-31'::date; END IF;
        RETURN end_date;          
    END;
$$ LANGUAGE plpgsql;

-- функция генерирования дат от начала проекта до его конца с интервалом в 1 день
-- если даты окончания у проекта нет, то генерируем до 31.12.2099
-- DROP FUNCTION generate_prj_days(prj_num integer);
CREATE OR REPLACE FUNCTION generate_prj_days(prj_num integer) RETURNS TABLE (busy_date TIMESTAMP WITH TIME ZONE) AS $$
    BEGIN 
    RETURN QUERY SELECT * FROM generate_series((SELECT find_prj_start_date(prj_num)),(SELECT find_prj_end_date(prj_num)),'1 day');
    END
$$ LANGUAGE plpgsql;

-- функция подготовки данных для одного проекта для вставки в таблицу busy_percentage
--DROP FUNCTION generate_prj_busy_days(prj_num integer);
CREATE OR REPLACE FUNCTION generate_prj_busy_days(prj_num integer) RETURNS TABLE  (slot_id integer, project_role_id integer, project_id integer, busy_percentage integer, busy_date TIMESTAMP WITH TIME ZONE) AS $$
    BEGIN 
        DROP TABLE IF EXISTS prj_days; 
        CREATE TABLE prj_days (
            days TIMESTAMP WITH TIME ZONE
        );

        INSERT INTO prj_days (days)
            SELECT generate_prj_days(prj_num);
            
        RETURN QUERY
            WITH 
            t_gen_busy_percentages AS 
            (
                SELECT assignments.slot_id, assignments.role_id  AS project_role_id, assignments.project_id, user_data.busy_percentage FROM assignments
                JOIN users ON assignments.user_id = users.id 
                JOIN project_roles ON assignments.role_id = project_roles.id 
                JOIN projects ON assignments.project_id = projects.id
                JOIN user_data ON (users.username = user_data.username AND projects."name" = user_data.project AND project_roles."name" = user_data.project_role)
                WHERE assignments.project_id = prj_num
            )    
            SELECT * FROM t_gen_busy_percentages
            CROSS JOIN prj_days;
    END;
$$ LANGUAGE plpgsql;

-- функция генерации процента занятости по всем проектам и вставка в таблицу busy_percenatges
--DROP FUNCTION generate_busy_percentages();
CREATE OR REPLACE FUNCTION generate_busy_percentages() RETURNS SETOF busy_percentages AS $$
    DECLARE 
        i integer;
        prj_quantity integer;
    BEGIN 
        prj_quantity =( SELECT projects.id FROM projects
                        ORDER BY id DESC LIMIT 1);
        
        FOR i IN 1..prj_quantity LOOP
            INSERT INTO busy_percentages (slot_id, project_role_id , project_id, percentage, date)
            SELECT * FROM generate_prj_busy_days(i);
        END LOOP;
        
        RETURN QUERY SELECT * FROM busy_percentages;

    RETURN;
    END
$$ LANGUAGE plpgsql;

-- заполнение таблицы busy_percentages
SELECT * FROM generate_busy_percentages();

--функция определения выходного дня: TRUE - выходной, FALSE - рабочий
CREATE OR REPLACE FUNCTION is_weekend_day(TIMESTAMP WITH TIME ZONE) RETURNS boolean 
    STRICT IMMUTABLE LANGUAGE 'sql'
    AS $$ SELECT CASE EXTRACT(dow FROM $1) WHEN 0 THEN TRUE WHEN 6 THEN TRUE ELSE FALSE END $$; 

 --для выходных дней устанавливаем назначение 0%
UPDATE busy_percentages 
    SET percentage = (CASE is_weekend_day(busy_percentages.date) WHEN TRUE THEN 0 ELSE busy_percentages.percentage END);

-- если нужно, то строки с 0м процентом удаляем
--DELETE FROM busy_percentages 
--    WHERE percentage = 0;

-- данные Карты Компетенций
--заполняем таблицу постов kk_posts 
ALTER SEQUENCE kk_posts_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO kk_posts  (name, created_at)
    SELECT DISTINCT kk_post, now() FROM user_data
RETURNING *;

--заполняем таблицу департаментов kk_departments 
ALTER SEQUENCE kk_departments_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO kk_departments  (name, created_at)
    SELECT DISTINCT kk_department, now() FROM user_data
RETURNING *;

--заполняем таблицу рабочих мест kk_workplaces 
ALTER SEQUENCE kk_workplaces_id_seq RESTART WITH 1; -- сброс id в 1
INSERT INTO kk_workplaces (post_id, department_id, created_at)
    SELECT DISTINCT kk_posts.id, kk_departments.id, now() FROM user_data
    JOIN kk_posts ON user_data.kk_post = kk_posts."name"
    JOIN kk_departments ON user_data.kk_department = kk_departments."name"  
RETURNING *;

--заполняем таблицу профилей kk_profiles
ALTER SEQUENCE kk_profiles_id_seq RESTART WITH 1; -- сброс id в 1
WITH 
    detailed_wrk_places AS (
        SELECT kk_workplaces.id, kk_posts."name" AS post_name, kk_departments."name" AS department_name FROM kk_workplaces
        JOIN kk_posts ON kk_workplaces.post_id = kk_posts.id
        JOIN kk_departments ON kk_workplaces.department_id = kk_departments.id  
    ),
    user_data_with_workplaces AS (
        SELECT DISTINCT user_data.kk_status, now(), user_data.kk_marital_status, users.id AS user_id, detailed_wrk_places.id AS workplace_id, now() FROM user_data
        JOIN detailed_wrk_places ON (user_data.kk_post = detailed_wrk_places.post_name) AND (user_data.kk_department = detailed_wrk_places.department_name)
        JOIN users ON user_data.username = users.username
    )
INSERT INTO kk_profiles (status, takingoffice_date, marital_status, user_id, workplace_id, created_at)
    SELECT DISTINCT user_data_with_workplaces.kk_status, now(), user_data_with_workplaces.kk_marital_status, user_data_with_workplaces.user_id, user_data_with_workplaces.workplace_id, now() FROM user_data_with_workplaces
RETURNING *;

--заполняем таблицу образования kk_education 
ALTER SEQUENCE kk_education_id_seq RESTART WITH 1; -- сброс id в 1
WITH 
    user_data_with_profiles AS (
        SELECT DISTINCT users.id AS user_id, user_data.kk_edu_type, user_data.kk_edu_direction, kk_profiles.id AS kk_profile_id FROM user_data
        JOIN users ON user_data.username = users.username
        JOIN kk_profiles ON users.id = kk_profiles.user_id
    )
INSERT INTO kk_education ("type",direction, profile_id, created_at)
    SELECT DISTINCT user_data_with_profiles.kk_edu_type, user_data_with_profiles.kk_edu_direction, user_data_with_profiles.kk_profile_id, now() FROM user_data_with_profiles
RETURNING *;

--заполняем таблицу администраторов kk_admin 
ALTER SEQUENCE kk_admin_id_seq RESTART WITH 1; -- сброс id в 1
WITH 
    admin_data_with_profile AS (
        SELECT DISTINCT  kk_profiles.id AS admin_kk_profile_id, now () FROM user_data
        JOIN users ON user_data.username = users.username
        JOIN kk_profiles ON users.id = kk_profiles.user_id
        WHERE user_data.system_role = 'админ'
    )
INSERT INTO kk_admin (profile_id, created_at)
    SELECT * FROM admin_data_with_profile
RETURNING *;


--удаление временных таблиц и функций
DROP TABLE IF EXISTS user_data;
DROP TABLE IF EXISTS prj_days;

DROP FUNCTION IF EXISTS find_prj_start_date(prj_id int);
DROP FUNCTION IF EXISTS find_prj_end_date(prj_id int);
DROP FUNCTION IF EXISTS  generate_prj_days(prj_num integer);
DROP FUNCTION IF EXISTS  generate_prj_busy_days(prj_num integer);
DROP FUNCTION IF EXISTS  generate_busy_percentages();
DROP FUNCTION IF EXISTS  is_weekend_day(TIMESTAMP WITH TIME ZONE);