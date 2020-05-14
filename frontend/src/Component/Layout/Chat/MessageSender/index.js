import React, {useState, useCallback, useRef} from 'react'
import './style.css'
import Emoji from '../Emoji'
import {IoMdSend, IoIosClose} from "react-icons/io";
import Button from "react-bootstrap/Button";
import {clearCitation, showAlert} from "../../../../redux/actions";
import {connect} from "react-redux";
import {useChat} from "../../../../hooks/useChatFirebase";

function MessageSender(props) {

    const chatDb = useChat();

    let enterFieldElement = useRef(null);

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

    function handleClickSend(e) {
        if (!enterFieldElement.current) return;

        if (!enterFieldElement.current.innerText) {
            props.showAlert({text: 'Введите текст!'})
            enterFieldElement.current.focus();
            return
        };

        chatDb.sendMessage(
            props.currentRoom.id,
            enterFieldElement.current.innerText,
            'default', false, props.citation.id,
            () => {
                props.clearCitation();
                enterFieldElement.current.innerText = '';
            }
        );

        enterFieldElement.current.focus();
        setUseEmojiComponent(false);
    }

    const callbackFromEmojiComp = useCallback(
        (emoji) => {
            if (!enterFieldElement.current) return;

            if (emoji) {
                let text = enterFieldElement.current.innerText;
                let beforeCaret = text.slice(0, caretPos);
                let afterCaret = text.slice(caretPos, text.length);
                enterFieldElement.current.innerText = beforeCaret + emoji + afterCaret;
                setCaretPos(caretPos + emoji.length);
            }
        }, [caretPos, enterFieldElement]
    );

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
                        <div ref={enterFieldElement}
                             className = 'enter-field'
                             contentEditable = {!!props.currentRoom}
                             spellCheck = {true}
                             onKeyUp={(e)=>{
                                 setCaretPos( getCaretPos(enterFieldElement.current) )
                             }}
                             onClick={(e)=>{
                                 setCaretPos( getCaretPos(enterFieldElement.current) )
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
