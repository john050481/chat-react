import {showLayout, requestRoomIdMessages, showAlert} from "../../../redux/actions";
import {REGION_CHAT} from "../../../redux/types";

export const itemsContextMenuForRooms = [
    {
        type: "item",
        title: "Room info",
        data: "room-info",
        icon: "info-circle",
        className: "" // this.state.type === "anyType" ? "disabled" : "" /*type, name or value*/
    },
    {
        type: "item",
        title: "Open room",
        data: "room-open",
        icon: "sign-in-alt",
        className: "" // this.state.type === "anyType" ? "disabled" : "" /*type, name or value*/
    },
    {
        type: "item",
        title: "Mute on/off",
        data: "room-mute",
        icon: "volume-mute",
        className: "" // this.state.type === "anyType" ? "disabled" : "" /*type, name or value*/
    },
    {
        type: "item",
        title: "Exit room",
        data: "room-exit",
        icon: "sign-out-alt",
        className: "" // this.state.type === "anyType" ? "disabled" : "" /*type, name or value*/
    },
];

export function handleClickOnItemRoom({data, roomId, dispatch, chatDb}) {
    console.log(data, roomId);

    if (data === 'room-info') {
        dispatch(showLayout( {region: REGION_CHAT, component: "RoomInfo", props: {roomId: roomId}} ));
    };
    if (data === 'room-open') {
        dispatch(requestRoomIdMessages( roomId, () => chatDb.getRoomMessages(roomId) ));
    };

    if (data === 'room-mute') {
        chatDb.toggleMuteRoom(roomId)
            .then( () => dispatch( showAlert({text: 'Done!', options: {variant: 'success'}}) ) )
            .catch( e => dispatch( showAlert({text: e.message, options: {variant: 'danger'}}) ) );
    };

    if (data === 'room-exit') {
        let isLeaveRoom = confirm("Выйти из чата?");
        if (isLeaveRoom)
            chatDb.leaveRoom(roomId)
                .catch( e => dispatch( showAlert({text: e.message, options: {variant: 'danger'}}) ) );
    }
}