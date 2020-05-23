import React, {useCallback, useEffect} from "react";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {showLayout} from "../../redux/actions";

export default function useLayout(props) {
    const {components, setRender, region} = props;

    const dispatch = useDispatch();
    const { layout } = useSelector(store => ({
        layout: store.app.layout
    }), shallowEqual);

    useEffect( () => {
        console.log('LAYOUT useEffect ############# ');

        if (!layout.region || !layout.component)
            return;

        if (layout.region === region)
            setRender( (prev) => () => components[layout.component] );
    }, [layout, region, setRender]);

    const handleClickOnNavBar = useCallback(
        (e) => {
            e.preventDefault();
            let elem = e.target.closest('[data-component]')
            if (!elem) return;
            let component = elem.dataset.component;
            if (!component) return;
            setRender( (prev) => () => components[component] );
            dispatch( showLayout({region: region, component}) );
        },
        [region, components, setRender],
    );

    return handleClickOnNavBar;
}
