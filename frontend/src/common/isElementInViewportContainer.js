//находится ли элемент внутри текущего контейнера
export default function isElementInViewportContainer(elem, container) {
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