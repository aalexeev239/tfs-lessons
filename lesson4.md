#Шаг 1

Создаем Intro Component
Создаем Sidebar Component
Создаем константу роутов: интро и список
routerLink
routerLinkActiveOptions

#Шаг 2

путь по умолчанию `{path: '', component: IntroComponent}`
матчинг путей
404 NotFoundComponent
wildcard для ненайденного
`[routerLinkActiveOptions]="{exact: true}"`

#Шаг 3

Добавляем в сайдбар список кошельков — WalletFireService выносится в общий модуль
Добавляем WalletFireService в сайдбар
Отрисовываем кошельки
Добвавляеь children routes: wallets/id, wallets, убирая `component: WalletListComponent`

#Шаг 4

Теперь надо адаптировать walletComponent
будем показывать шаблон по ngIf
если кошелек установлен — по стандартному флоу
если не установлен — будем забирать из url: 
`private route: ActivatedRoute,`
`this.route.paramMap`
метод получения кошелька `this.walletFire.getWallet`
кошелек не найден — `this.router.navigate(['/wallets']);`

#Шаг 5

Первый гвард
AuthGuard
`path: 'wallets', canActivate: [AuthGuard],`
возвращает boolean
возвращает Observable

#Шаг 6

Простейший LoginComponent
Логин в роутинге
Сервис авторизации AuthService: login, logout, isLoggedIn$
подключение в AuthGuard
подключение в сайдбар

#Шаг 7

Добавляем выход в сайдбар
Проблема с выходом в авторизованной зоне
canActivateChild

#Шаг 8

Редирект при выходе
router в AuthService

#Шаг 9

Подключаем AngularFireAuth

AngularFireAuthModule, в модуль приложения
AngularFireAuth в компонент

this.firebaseAuth.authState
свой user$, которого выводим в сайдбар
добавляем в гард

#Шаг 10

Форма логина
логин в отдельный модуль
    модель формы
    разметка
    сабмит формы
    обработка ошибок
отдельный метод логина

#Шаг 11

Адекватные редиректы
В Intro "начать" — на кошельки
В AuthGuard добавляем this.authService.redirectUrl и редирект на логин
В AuthService действие при логине
В AuthService редирект при логауте из кошельков

#Шаг 12

signUp —  регистрация
новый метод, редирект принудительный
в LoginComponent устраняем дублирование через bind  
вывод более читабельных ошибок

#Шаг 13

reset-db

WalletFireService
    getUserId() — получаем пользовательский id
    getWallets() – список кошельков зависит от uid: this.db.list(`users/${id}/wallets`)
    addWallet() – получаем список и пушим новое значение
выводим метод addWallet в компонент
смотрим, как меняется база
Фиксим сервис авторизации — BehaviourSubject на Replay

#Шаг 14
Редактирование имени кошелька
contenteditable
`#refs`
сабджект по изменениям
цепочка преобразований сабджекта
редактирование кошелька
