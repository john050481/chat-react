import './style.css'
import React, {useState} from "react";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import ButtonWithLoader from '../../../../common/ButtonWithLoader';
import InputGroup from "react-bootstrap/InputGroup";
import {useChat} from "../../../../hooks/useChatFirebase";
import {showAlert, showLayout} from "../../../../redux/actions";
import {connect} from "react-redux";

function CreateRoom({showAlert, showLayout}) {
    console.log('Render CreateRoom');

    const chatDb = useChat();

    const [visibleLoader, setVisibleLoader] = useState(false);
    const [roomName, setChatName] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    async function handlerSave(e) {
        setVisibleLoader(true);
        try {
            const roomType = isPublic ? 'public' : 'private' ;
            const roomId = await chatDb.createRoom(roomName, roomType);
            await chatDb.enterRoom(roomId);
            showAlert({text: 'Room create!', options: {variant: 'success'}});
            showLayout({region: ''});
        } catch (e) {
            showAlert({text: e.message, options: {variant: 'danger'}})
        }
        setVisibleLoader(false);
    }

    return (
        <div>
            <h1>Create room</h1>
            <InputGroup className="p-3 create-room">
                <FormControl
                    placeholder="room name"
                    aria-label="room name"
                    value={roomName}
                    onChange={ e => setChatName(e.target.value) }
                />
                <InputGroup.Append>
                    <ButtonWithLoader variant="outline-primary" onClick={handlerSave} visibleLoader={visibleLoader}>Save</ButtonWithLoader>
                </InputGroup.Append>
            </InputGroup>
            <Form.Check
                className='create-room-switch'
                id="chatIsPublic"
                type="switch"
                label="public"
                value={isPublic}
                onChange={ e => setIsPublic(e.target.value) }
            />
        </div>
    )
}

const mapStateToProps = store => {
    return {
    }
}
const mapDispatchToProps = {
    showAlert,
    showLayout
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)