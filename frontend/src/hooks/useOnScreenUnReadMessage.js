// Hook
import { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

export default function useOnScreenUnReadMessage(ref, chatDb, message, rootMargin = '0px') {
    const [isRead, setIsRead] = useState(null);

    const { statuses, currentRoomId } = useSelector(store => ({
        statuses: store.chat.statuses,
        currentRoomId: store.chat.currentRoomId
    }), shallowEqual);

    useEffect(() => {

        if (!chatDb.userId || !message || !statuses.length)
            return;

        const messageStatus = statuses.find( messageStatus => messageStatus.id === message.id);
        console.log('messageStatusmessageStatusmessageStatus = ', message, messageStatus);
        if (!messageStatus)
            return;

        const messageIsRead = messageStatus.users.includes(chatDb.userId);
        console.log('isReadisReadisReadisReadisReadisRead === ', messageIsRead);
        setIsRead(messageIsRead);
        if (messageIsRead) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log("observer = new IntersectionObserver", entry);
                if (entry.isIntersecting)
                    chatDb.updateMessageStatus(currentRoomId, message.id, [chatDb.userId])
                        .then( () => observer.unobserve(ref.current) )
                        .catch( e => console.log('!!!!!!!! ERROR !!!!!!!!'));
            },
            {
                rootMargin
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    }, [chatDb.userId, message, statuses]); // Empty array ensures that effect is only run on mount and unmount

    return isRead;
}