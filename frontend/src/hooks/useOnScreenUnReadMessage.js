// Hook
import { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

export default function useOnScreenUnReadMessage(ref, chatDb, message, rootMargin = '0px') {
    const [isRead, setIsRead] = useState(null);

    const { messageStatus, currentRoomId, appIsVisible, appInFocus } = useSelector(store => ({
        messageStatus: store.chat.statuses.find( messageStatus => messageStatus.id === message.id),
        currentRoomId: store.chat.currentRoomId,
        appIsVisible: store.app.appIsVisible,
        appInFocus: store.app.appInFocus
    }), shallowEqual);

    useEffect(() => {
        if (!chatDb.userId || !message || !messageStatus)
            return;

        const messageIsRead = messageStatus.usersWhoRead.includes(chatDb.userId);
        setIsRead(messageIsRead);
        if (messageIsRead)
            return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log("observer = new IntersectionObserver", entry);
                if (entry.isIntersecting && appIsVisible && appInFocus)
                    chatDb.userIsReadMessage(currentRoomId, message.id, chatDb.userId)
                        .then( () => observer.unobserve(ref.current) )
                        .catch( e => console.log('!!!!!!!! ERROR !!!!!!!!'));
            },
            {
                rootMargin,
                threshold: 0.5
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    }, [chatDb.userId, message, messageStatus, currentRoomId, appIsVisible, appInFocus]); // Empty array ensures that effect is only run on mount and unmount

    return isRead;
}