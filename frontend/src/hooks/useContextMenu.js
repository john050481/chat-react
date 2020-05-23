import React, {useEffect} from "react";

export default function useContextMenu(props) {
    const {ref, handler} = props;
    useEffect(
        () => {
            if (!ref.current)
                return;

            const listener = event => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            ref.current.addEventListener('touchstart', listener);

            return () => {
                ref.current.removeEventListener('contextmenu', listener);
            };
        },
        [ref, handler]
    );
}