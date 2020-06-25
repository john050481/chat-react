// Hook
import { useState, useEffect } from 'react';
export default function useWindowFocus() {
    const isClient = typeof window === 'object';

    const [chatIsFocus, setChatIsFocus] = useState(document.hasFocus());

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function onFocus(e){
            setChatIsFocus(true);
        };
        function onBlur(e) {
            setChatIsFocus(false);
        };

        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);

        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        }
    }, []);

    return chatIsFocus;
}
