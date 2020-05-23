import './style.css';
import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {connect} from "react-redux";
import {showAlert} from '../../../redux/actions';
import {useChat} from "../../../hooks/useChatFirebase";
import AccordionApp from '../../../common/Accordion';
import ButtonWithLoader from '../../../common/ButtonWithLoader';
import formatDate from '../../../common/formatDate';

function TemplateComponent(props) {
    const {label, name, value, disabled=false, onChange, as=Col, type='text'} = props;
    return (
        <Form.Row>
            <Form.Group as={as}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    type={type}
                    name={name}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                />
            </Form.Group>
        </Form.Row>
    )
}

function Profile({user, showAlert}) {
    console.log('Render Profile')

    const chatDb = useChat();

    const [chatUser, setChatUser] = useState({...user});

    const [visibleLoader, setVisibleLoader] = useState(false);

    function handlerSave(e) {
        setVisibleLoader(true);
        chatDb.updateUser(user.id, chatUser)
            .finally( () => setVisibleLoader(false) )
            .then( () => {
                showAlert({text: 'Update user done!', options: {variant: 'success'}});
            })
            .catch( e => {
                showAlert({text: e.message, options: {variant: 'danger'}})
            });
    }

    function handlerValueChange(e) {
        const path = e.target.name;
        const pathArr = path.split('.');
        const value = e.target.value;
        let newChatUser = {...chatUser};

        let curProp = newChatUser;
        for (let i=0; i<pathArr.length; i++) {
            if (i === pathArr.length-1) {
                // curProp[pathArr[i]] - last property
                curProp[pathArr[i]] = value; // мы дошли до конца массива, изменяем нужное нам свойство
            } else {
                // curProp[pathArr[i]] - this'is object
                curProp[pathArr[i]] = { ...curProp[pathArr[i]] }; // создаем новый объект и копируем все свойства из старого
                curProp = curProp[pathArr[i]]; // устанавливаем ссылку на только что созданный объект
            }
        };
        setChatUser(newChatUser);
        /*
        console.log('path = e.target.name = ', path, pathArr);
        console.log('value = e.target.value = ', value);
        console.log( 'chatUser = ', chatUser);
        console.log( 'newChatUser = ', newChatUser);

        console.log('chatUser === newChatUser === ', chatUser === newChatUser);
        console.log('chatUser.company === newChatUser.company === ', chatUser.company === newChatUser.company);
        console.log('chatUser.address === newChatUser.address === ', chatUser.address === newChatUser.address);
        console.log('chatUser.address.geo === newChatUser.address.geo === ', chatUser.address.geo === newChatUser.address.geo);
        console.log('chatUser.address.geo.lat === newChatUser.address.geo.lat === ', chatUser.address.geo.lat === newChatUser.address.geo.lat);
        console.log('chatUser.invites === newChatUser.invites === ', chatUser.invites === newChatUser.invites);
        console.log('chatUser.rooms === newChatUser.rooms === ', chatUser.rooms === newChatUser.rooms);
        console.log('chatUser.muted === newChatUser.muted === ', chatUser.muted === newChatUser.muted);
        console.log('chatUser.contacts === newChatUser.contacts === ', chatUser.contacts === newChatUser.contacts);
        */
    }

    return (
        user &&
        <div className='profile-block'>
            <div className="profile-block__sticky">
                <ButtonWithLoader className="profile-block__button" variant="primary" onClick={handlerSave} visibleLoader={visibleLoader}>
                    Save
                </ButtonWithLoader>
            </div>

            <h1>Profile</h1>

            {/*здесь ИЗменяемые*/}
            <AccordionApp isOpen={true} title='Основное' >
                <TemplateComponent label={'Name'} name={'name'} value={chatUser.name} onChange={handlerValueChange} />
                <TemplateComponent label={'Website'} name={'website'} value={chatUser.website} onChange={handlerValueChange} />
                <TemplateComponent label={'User name'} name={'username'} value={chatUser.username} onChange={handlerValueChange} />
            </AccordionApp>

            <AccordionApp title='Company' >
                <TemplateComponent label={'Company name'} name={'company.name'} value={chatUser.company.name} onChange={handlerValueChange} />
                <TemplateComponent label={'Company catchPhrase'} name={'company.catchPhrase'} value={chatUser.company.catchPhrase} onChange={handlerValueChange} />
                <TemplateComponent label={'Company bs'} name={'company.bs'} value={chatUser.company.bs} onChange={handlerValueChange} />
            </AccordionApp>

            <AccordionApp title='Address' >
                <TemplateComponent label={'City'} name={'address.city'} value={chatUser.address.city} onChange={handlerValueChange} />
                <TemplateComponent label={'Street'} name={'address.street'} value={chatUser.address.street} onChange={handlerValueChange} />
                <TemplateComponent label={'Suite'} name={'address.suite'} value={chatUser.address.suite} onChange={handlerValueChange} />
                <TemplateComponent label={'Zipcode'} name={'address.zipcode'} value={chatUser.address.zipcode} onChange={handlerValueChange} />
                <TemplateComponent label={'Geo lat'} name={'address.geo.lat'} value={chatUser.address.geo.lat} onChange={handlerValueChange} />
                <TemplateComponent label={'Geo lng'} name={'address.geo.lng'} value={chatUser.address.geo.lng} onChange={handlerValueChange} />
            </AccordionApp>

            {/*здесь НЕ изменяемые*/}
            <AccordionApp title='Дополнительно' >
                <TemplateComponent label={'ID'} value={user.id} disabled={true} />
                <TemplateComponent label={'Email'} value={user.email} disabled={true} />
                <TemplateComponent label={'Phone'} value={user.phone} disabled={true} />
                <hr />
                <TemplateComponent label={'Last activity'} value={formatDate(user.lastActivity.seconds*1000)} disabled={true} />
            </AccordionApp>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        user: store.chat.user
    }
}
const mapDispatchToProps = {
    showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)