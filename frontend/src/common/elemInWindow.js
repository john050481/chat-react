// Функция проверяет виден ли элемент на экране
// В функцию можно сразу передать колбеки, на вход колбека передается target,
// например, можно прокрутить элемент, если он не виден: elemInWindow(curElemChatId, null, target => target.scrollIntoView() );
// !!! функция проверяет видимость элемента относительно окна, если скрол внутри какого-то контейнера, то тогда нужно
// !!! продумать чтоб в функцию можно было передавать и контейнер, чтоб вычислить видимость относительно контейнера

// Получаем нужный элемент
//const element = document.querySelector('#target');

export default function elemInWindow(target, callbackIsVisible, callbackIsNotVisible) {
    const coordsTarget = target.getBoundingClientRect();
    // Все позиции элемента
    var targetPosition = {
            top: window.pageYOffset + coordsTarget.top,
            left: window.pageXOffset + coordsTarget.left,
            right: window.pageXOffset + coordsTarget.right,
            bottom: window.pageYOffset + coordsTarget.bottom
        },
        // Получаем позиции окна
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
        // Если элемент полностью видно, то запускаем следующий код
        console.clear();
        console.log('Вы видите элемент :)');
        callbackIsVisible && callbackIsVisible(target);
        return true;
    } else {
        // Если элемент не видно, то запускаем этот код
        console.clear();
        console.log('Элемент НЕ виден!');
        callbackIsNotVisible && callbackIsNotVisible(target);
        return false;
    };
};