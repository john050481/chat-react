//находится ли элемент внутри текущего контейнера
export default function isElementInViewportContainer(elem, container) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && elem instanceof jQuery) {
        elem = elem[0];
    }

    const rectElem = elem.getBoundingClientRect();
    const rectContainer = container.getBoundingClientRect();

    const result = {
        top: rectElem.top >= rectContainer.top,
        left: rectElem.left >= rectContainer.left,
        bottom: rectElem.bottom <= rectContainer.bottom,
        right: rectElem.right <= rectContainer.right
    };
    result.elemIsInsideContainer = result.top && result.left && result.bottom && result.right;

    return result
}