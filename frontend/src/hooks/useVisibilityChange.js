/*
// https://tokmakov.msk.ru/blog/item/206
С недавнего времени в новых браузерах появилось Page Visibility API,
которое позволяет узнать, находится ли страница в активной вкладке браузера.
Свойство visibilityState объекта document может принимать значение:
 - visible,
 - hidden
 - prerender.
C visible и hidden все понятно, а prerender означает, что содержимое страницы
в настоящее время находится в состоянии отрисовки.
Когда значение этого свойства изменяется, возникает событие visibilitychange.
*/

/*
document.addEventListener("visibilitychange", function() {
    console.log(document.visibilityState);
    console.log(document.hidden);
});
*/

// Hook
import { useState, useEffect } from 'react';
export default function useVisibilityChange() {
    const isClient = typeof window === 'object';

    const [chatIsVisible, setChatIsVisible] = useState(!document.hidden);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleVisibilityChange(e) {
            console.log('document.visibilityState === ', document.visibilityState);
            console.log('document.hidden === ', document.hidden);
            setChatIsVisible(!document.hidden);
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return chatIsVisible;
}