import React, {useCallback, useEffect} from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {showLayout} from "../../redux/actions";

import CreateRoom from "./RoomList/CreateRoom";
import RoomInfo from "./Chat/RoomInfo";
import FakeSearchMessage from "../../common/FakeComponent/FakeSearchMessage";
import FakeSettings from "../../common/FakeComponent/FakeSettings";
import UserProfile from "./Root/UserProfile";
import AuthForm from "../AuthForm";
import About from "../About";

import usePrevious from "../../hooks/usePrevious";

export const components = {
    CreateRoom: <CreateRoom />,
    RoomInfo: <RoomInfo />,
    FakeSearchMessage: <FakeSearchMessage />,
    FakeSettings: <FakeSettings />,
    UserProfile: <UserProfile />,
    AuthForm: <AuthForm />,
    About: <About />
};

export default function useLayout(props) {
    const {region} = props;

    const dispatch = useDispatch();
    const { layout } = useSelector(store => ({
        layout: store.app.layout
    }), shallowEqual);

    let prevLayout = usePrevious(layout);

    useEffect( () => {
        console.log('LAYOUT useEffect ############# ', layout, prevLayout);
    }, [layout.region, layout.component, region]);

    const handleClickOnNavBar = useCallback(
        (e) => {
            e.preventDefault();
            let elem = e.target.closest('[data-component]')
            if (!elem) return;
            let component = elem.dataset.component;
            if (!component) return;
            dispatch( showLayout({region: region, component}) );
        },
        [region],
    );

    return handleClickOnNavBar;
}
