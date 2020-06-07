// Hook
import { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

export default function useOnScreenUnReadMessage(ref, chatDb, message, currentRoomId, rootMargin = '0px') {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(null);
    const [isRead, setIsRead] = useState(null);

    const dispatch = useDispatch();
    const { statuses } = useSelector(store => ({
        statuses: store.chat.statuses
    }), shallowEqual);

    useEffect(() => {

        if (!chatDb.userId || !message || !statuses.length)
            return;

        const messageStatus = statuses.find( messageStatus => messageStatus.id === message.id);
        console.log('messageStatusmessageStatusmessageStatus = ', statuses, message, messageStatus);
        if (!messageStatus)
            return;

        const messageIsRead = messageStatus.users.includes(chatDb.userId);
        console.log('isReadisReadisReadisReadisReadisRead === ', messageIsRead);
        if (messageIsRead) {
            console.log("###isReadisReadisReadisReadisRead### === ", isRead);
            setIsRead(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                console.log("observer = new IntersectionObserver");
                setIntersecting(entry.isIntersecting);
                chatDb.updateMessageStatus(currentRoomId, message.id, [chatDb.userId])
                    .then( () => observer.observe(ref.current) )
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

    return {isIntersecting, isRead};
}