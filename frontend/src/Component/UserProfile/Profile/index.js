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

    function TemplateComponentDisabled(props) {
        const {label, value, as=Col, type='text'} = props;
        return (
            <Form.Row>
                <Form.Group as={as}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control type={type} value={value} disabled/>
                </Form.Group>
            </Form.Row>
        )
    }

    return (
        user &&
        <div className='profile-block'>
            <h1>Profile</h1>

            {/*здесь ИЗменяемые*/}
            <AccordionApp isOpen={true} title='Основное' >
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name={'name'} value={chatUser.name} onChange={handlerValueChange}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" name={'website'} value={chatUser.website} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" name={'username'} value={chatUser.username} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
                </AccordionApp>

                <AccordionApp title='Company' >
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Company name</Form.Label>
                        <Form.Control type="text" name={'company.name'} value={chatUser.company.name} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Company catchPhrase</Form.Label>
                        <Form.Control type="text" name={'company.catchPhrase'} value={chatUser.company.catchPhrase} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Company bs</Form.Label>
                        <Form.Control type="text" name={'company.bs'} value={chatUser.company.bs} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
            </AccordionApp>

            <AccordionApp title='Address' >
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name={'address.city'} value={chatUser.address.city} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" name={'address.street'} value={chatUser.address.street} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Suite</Form.Label>
                        <Form.Control type="text" name={'address.suite'} value={chatUser.address.suite} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>zipcode</Form.Label>
                        <Form.Control type="text" name={'address.zipcode'} value={chatUser.address.zipcode} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Geo lat</Form.Label>
                        <Form.Control type="text" name={'address.geo.lat'} value={chatUser.address.geo.lat} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Geo lng</Form.Label>
                        <Form.Control type="text" name={'address.geo.lng'} value={chatUser.address.geo.lng} onChange={handlerValueChange} />
                    </Form.Group>
                </Form.Row>
            </AccordionApp>

            {/*здесь НЕ изменяемые*/}
            <AccordionApp title='Дополнительно' >
                <TemplateComponentDisabled label={'ID'} value={user.id} />
                <TemplateComponentDisabled label={'Email'} value={user.email} />
                <TemplateComponentDisabled label={'Phone'} value={user.phone} />
                <hr />
                <TemplateComponentDisabled label={'Last activity'} value={formatDate(user.lastActivity.seconds*1000)}/>
            </AccordionApp>

            <ButtonWithLoader variant="primary" onClick={handlerSave} visibleLoader={visibleLoader}>
                Save
            </ButtonWithLoader>


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