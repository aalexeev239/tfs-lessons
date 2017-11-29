# TfsLessons

Последовательные шаги урока: 
[Урок 1](lesson1.md)
[Урок 2](lesson2.md)

Шаги находятся в папке `_steps_`, их править не нужно 

## Домашнее задание 2
1. Сделайте форк репозитория
2. Подключите travis для этого репозитория
3. Создайте ветку **lesson-02-hw** от ветки **lesson-02** репозитория
4. Firebase
  - зарегистрируйтесь в Firebase
  - создайте новый проект с базой данных
  - выставите анонимную авторизацию и права на чтение и запись (см. презентацию)
  - получите конфиг проекта (на главной странице проекта кнопка "Добавьте Firebase в свое веб-приложение")
  - сохраните конфиг в [src/environments/firebase.config.ts](src/environments/firebase.config.ts)
  - сохраните корневой адрес базы данных в [src/app/constants/baseUrl.const.ts](src/app/constants/baseUrl.const.ts). Например, `https://qwerty.firebaseio.com`
5. Исправьте приложение, чтобы все тесты проходили (`npm run test`). 
6. Создайте пул-реквест из ветки **lesson-02-hw** в ветку **lesson-02** **вашего** форка. Важно: не мержите пул-реквест самостоятельно.

FYI:

Чтобы создать базу автоматически, запустите `npm run populate-db`

S. не забудьте про `npm i`

P.S. тесты расположены в файлах `.spec.ts`.

P.P.S. комментируйте тесты, мешающие компилляции — к ним можно вернуться позже.  

===

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
