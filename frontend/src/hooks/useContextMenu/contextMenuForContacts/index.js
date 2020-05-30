import {showLayout} from "../../../redux/actions";
import {REGION_CHAT} from "../../../redux/types";

export const itemsContextMenuForContacts = [
    {
        type: "item",
        title: "Contact info",
        data: "contact-info",
        icon: "info-circle",
        className: "" // this.state.type === "anyType" ? "disabled" : "" /*type, name or value*/
    },
    {
        type: "item",
        title: "Start chat with contact",
        data: "contact-start-chat",
        icon: "comment",
        className: "" // this.state.type === "anyType" ? "disabled" : "" /*type, name or value*/
    },
];

export function handleClickOnItemContact(data, contactId, dispatch) {
    console.log(data, contactId);

    if (data === 'contact-info') {
        dispatch(showLayout( {region: REGION_CHAT, component: "Profile", props: {userId: contactId}} ));
    }
    if (data === 'contact-start-chat') {
        console.log("!!!!!!!!!!! РЕАЛИЗОВАТЬ !!!!!!!!!!!");
    };
}