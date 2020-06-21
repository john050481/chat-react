//https://overcoder.net/q/2640/как-определить-виден-ли-элемент-dom-в-текущем-окне-просмотра
//виден ли элемент в текущем окне просмотра
export function isElementInViewport(el) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

//находится ли элемент внутри текущего контейнера
export function isElementInViewportContainer(elem, container) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && elem instanceof jQuery) {
        elem = elem[0];
    }

    const rectElem = elem.getBoundingClientRect();
    const rectContainer = container.getBoundingClientRect();

    const result = {
        top: rectElem.top >= rectContainer.top,          // если false - элемент вылез за пределы контейнера сверху
        left: rectElem.left >= rectContainer.left,       // если false - элемент вылез за пределы контейнера слева
        bottom: rectElem.bottom <= rectContainer.bottom, // если false - элемент вылез за пределы контейнера снизу
        right: rectElem.right <= rectContainer.right     // если false - элемент вылез за пределы контейнера справа
    };
    result.elemIsInsideContainer = result.top && result.left && result.bottom && result.right; // итог, если хоть что-то из верхнего false - элемент НЕ в контейнере

    return result
}