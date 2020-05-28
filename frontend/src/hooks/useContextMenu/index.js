import React, {useEffect} from "react";

////////////////////////////!!!!!!!!!!!!!!!!!!!!!!
// использовать!!!
export default function index(ref, handler) {
    useEffect(
        () => {
            if (!ref.current)
                return;

            const listener = event => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || !ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            ref.current.addEventListener('contextmenu', listener);

            return () => {
                ref.current.removeEventListener('contextmenu', listener);
            };
        },
        [ref, handler]
    );
}

