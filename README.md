# chat-react
Пример можно посмотреть здесь:
[http://94.232.8.10:9300](http://94.232.8.10:9300/)
(backend еще не работает, оспользую заглушки из внешнего, открытого, API, см.ниже)
# Getting started
## 1)
```bash
git clone https://github.com/john050481/chat-react.git
```
## 2)
Все подробности тут: https://firebase.google.com/docs/web/setup?authuser=0#add-sdks-initialize
- Должен быть проект на firebase (https://console.firebase.google.com/)
- Положить в папку файл: frontend/src/config/config.js
- Содержание:
```js
export default {
    firebaseConfig: {
        apiKey: "...",
        authDomain: "...",
        databaseURL: "...",
        projectId: "...",
        storageBucket: "...",
        messagingSenderId: "...",
        appId: "..."
    }
}
```
## 3)
```bash
cd chat-react/frontend
npm i
npm start
```
# Что использовалась
- Javascript (Promise, async/await)
- React (HOC, render prop)
- Redux (connect, middleware, devtools)
- Redux-saga
- React hooks
- React-router (router dom)
# Внешнее источники/компоненты:
- Аутентификация: [Firebase](https://firebase.google.com/docs/auth/web/start)
- Фома аутентификации: [моя форма](https://www.npmjs.com/package/@john0504/react-authform)
- Эмоджи: [Emoji API](https://emoji-api.com)
- Данные: [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- Хуки: [useHooks.com](https://usehooks.com)
- Bootstrap: [React-bootstrap](https://react-bootstrap.github.io/components/)
- Icons: [React-icons](https://react-icons.netlify.app/)
- Effects: [React-transition-group](https://reactcommunity.org/react-transition-group/)