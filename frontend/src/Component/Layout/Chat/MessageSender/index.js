import React, {useState, useCallback} from 'react'
import './style.css'
import Emoji from '../Emoji'
import {IoMdSend, IoIosClose} from "react-icons/io";
import Button from "react-bootstrap/Button";
import {clearCitation, showAlert} from "../../../../redux/actions";
import {connect} from "react-redux";
import {useChat} from "../../../../hooks/useChatFirebase";

function MessageSender(props) {

    const chatDb = useChat();

    const [caretPos, setCaretPos] = useState(null);
    const [useEmojiComponent, setUseEmojiComponent] = useState(false);

    function getCaretPos(element) {
        element.focus();
        if (document.selection) {
            var sel = document.selection.createRange();
            var clone = sel.duplicate();
            sel.collapse(true);
            clone.moveToElementText(element);
            clone.setEndPoint('EndToEnd', sel);
            return clone.text.length;
        } else {
            return window.getSelection().getRangeAt(0).startOffset;
        }
        return 0;
    }

    function setFocusOnEnterField() {
        let enterField = document.querySelector('.enter-field');
        enterField.focus();
        return enterField;
    }
    function scrollDownMessageContainer() {
        //let messageContainer = document.getElementById('message-block')
        let messageContainer = document.querySelector('.message-block-scroll');
        messageContainer.scrollTop = messageContainer.scrollHeight
    };

    function handleClickSend(e) {
        let target = document.querySelector('[contentEditable]');
        if (!target.innerText) {
            props.showAlert({text: 'Введите текст!'})
            setFocusOnEnterField();
            return
        };
        //console.log(target.innerText.codePointAt(0));
        //console.log(String.fromCodePoint(129315, 9995, 128522, 0x1F602))

        chatDb.sendMessage(
            props.currentRoom.id,
            target.innerText,
            'default', false, props.citation.id
        );

        props.clearCitation();
        /*
        let citationElem = '';
        if (props.citation.text) {
            citationElem = document.createElement("div");
            citationElem.classList.add('citation-item');
            citationElem.setAttribute('data-citation', true);
            citationElem.innerText = props.citation.text;
            props.clearCitation();
        }

        let message = document.createElement("div");
        message.classList.add('message-wrap', 'right-message', 'right-color');
        message.setAttribute('data-message', true)
        message.innerText = target.innerText;
        if (citationElem) message.prepend(citationElem);
        document.getElementById('message-block').append(message);
        */
        target.innerText = '';
        scrollDownMessageContainer();
        setFocusOnEnterField();
        setUseEmojiComponent(false);
    }

    const callbackFromEmojiComp = useCallback(
        (emoji) => {
            callbackFromEmojiComp2(emoji)
        }, [caretPos]
    );

    function callbackFromEmojiComp2(emoji){
        if (emoji) {
//            let enterField = setFocusOnEnterField();
            let enterField = document.querySelector('.enter-field');

            let text = enterField.innerText;
            let beforeCaret = text.slice(0, caretPos);
            let afterCaret = text.slice(caretPos, text.length);
            enterField.innerText = beforeCaret + emoji + afterCaret;
            setCaretPos(caretPos + emoji.length);
        }
    }

    function handleClickEmojiIcon(e) {
        setUseEmojiComponent(!useEmojiComponent);
    }

    return (
        <React.Fragment>
            <div className='messagesender'>
                <div className='messagesender-wrapper'>
                    <div className='element-wrapper'>
                        {
                            useEmojiComponent
                                ? <Emoji style={{position: 'absolute', bottom: 0}} callback={callbackFromEmojiComp}/>
                                : null
                        }
                    </div>
                    <div className='enter-block-wrapper'>
                        {useEmojiComponent ? <Button variant="outline-dark" className="messagesender-button" onClick = {handleClickEmojiIcon}><IoIosClose /></Button> : null}
                        <Button variant="outline-dark" className="messagesender-button" disabled={!props.currentRoom} onClick = {handleClickEmojiIcon}>
                            {String.fromCodePoint(129315)}
                        </Button>
                        <div className = 'enter-field'
                             contentEditable = {!!props.currentRoom}
                             spellCheck = {true}
                             onKeyUp={(e)=>{
                                 setCaretPos( getCaretPos(document.querySelector('.enter-field')) )
                             }}
                             onClick={(e)=>{
                                 setCaretPos( getCaretPos(document.querySelector('.enter-field')) )
                             }}
                        >
                        </div>
                        <Button variant="outline-dark" className="messagesender-button" disabled={!props.currentRoom} onClick = {handleClickSend}>
                            <IoMdSend />
                        </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = store => {
    return {
        currentRoom: store.chat.currentRoom,
        citation: store.chat.citation
    }
}
const mapDispatchToProps = {
    showAlert,
    clearCitation
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSender)
