import {shallowEqual, useSelector} from "react-redux";
import {useChat} from "../hooks/useChatFirebase";

export default function useCountUnReadMessage(props) {
    console.log('Render useCountUnReadMessage');

    const chatDb = useChat();

    const { statuses } = useSelector(store => ({
        statuses: store.chat.statuses
    }), shallowEqual);

    return statuses.filter( messageStatus => messageStatus.usersWhoNotRead.includes(chatDb.userId) ).length;
}
