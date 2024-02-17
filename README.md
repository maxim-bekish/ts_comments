# Commenting-system

### Описание

Система комментирования реализованная на TypeScript.

### Инструменты:

- HTML
- SCSS
- TypeScript
- Ajax

### Как запустить:

- Клонируем репозиторий себе на локальный ПК (git clone https://github.com/maxim-bekish/ts_comments)
- Устанавливаем пакеты **с помощью npm i**
- Запускаем проект **с помощью npm run start**

### В реализованном проекте можно:

- Добавлять комментарии. Так как проект не подразумевает создание серверной части, данные можно сохранять в браузере, а для тестирования использовать mock-данные (искусственные данные, имитирующие реальные) ("https://randomuser.me/api/").
- Отвечать на уже существующие комментарии.
- Задавать максимальную длину комментария (1000 символов). При превышении этого лимита пользователю запрещается публиковать комментарий (кнопка отправки комментария должна стать неактивной).
- Изменять рейтинг комментария — увеличивать или уменьшать его на единицу. Каждый пользователь может менять рейтинг строго на единицу (не более). Данные о рейтинге и его изменении можно также хранить в браузере. Прописать это можно в localStorage, чтобы и после обновления страницы было видно, что пользователь уже поменял рейтинг комментария.
- Добавлять комментарий в избранное. После добавления комментария в избранное должны изменяться иконка и текст (макет). При повторном нажатии все изменения отменяются и комментарий перестаёт быть избранным.
- Сортировать все комментарии по различным параметрам — избранные, по дате размещения, количеству оценок, количеству ответов. По умолчанию используйте сортировку по дате размещения.

### Требования к коду

- Проект выполнен с использованием TypeScript.
- На ES6-классах.
- Соблюдено единообразие оформления кода: корректные отступы между смысловыми блоками, единый формат отступов от левого края и так далее.
- Все переменные, классы и функции имеют осмысленные имена.
- Проект следует принципам DRY (Don’t Repeat Yourself) и KISS (Keep It Short and Simple).
- Все комментарии хранятся в localStorage.
- Для генерирования аватаров пользователей применяются сторонние сервисы.
