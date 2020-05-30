import React, {useCallback} from "react";
import { useDispatch } from 'react-redux';
import {showLayout} from "../../redux/actions";

import CreateRoom from "./RoomList/CreateRoom";
import RoomInfo from "../RoomInfo";
import FakeSearchMessage from "../../common/FakeComponent/FakeSearchMessage";
import FakeSettings from "../../common/FakeComponent/FakeSettings";
import UserProfile from "./Root/UserProfile";
import AuthForm from "../AuthForm";
import About from "../About";
import Profile from "../Profile";

export const components = {
    CreateRoom: CreateRoom,
    RoomInfo: RoomInfo,
    FakeSearchMessage: FakeSearchMessage,
    FakeSettings: FakeSettings,
    UserProfile: UserProfile,
    AuthForm: AuthForm,
    About: About,
    Profile: Profile
};

export default function useLayout(props) {
    const {region} = props;

    const dispatch = useDispatch();

    const handleShowLayout = useCallback(
        (e) => {
            e.preventDefault();
            let elem = e.target.closest('[data-component]')
            if (!elem) return;
            let component = elem.dataset.component;
            if (!component) return;
            dispatch( showLayout({ region, component, props: {} }) );
        },
        [region],
    );

    return handleShowLayout;
}
