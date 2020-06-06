import './style.css'
import React, {useEffect, useRef} from 'react'
import {IoIosArrowDown} from 'react-icons/io';
import {connect} from "react-redux";
import {useChat} from "../../../../../hooks/useChatFirebase";

function StatusedAndGoEnd(props) {
    console.log('Render StatusedAndGoEnd');

    const {messageBlockScroll, isScrollEnd, statuses} = props;

    const chatDb = useChat();

    function handleClick(e) {
        if (!messageBlockScroll.current) return;
        messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
    }

    const countUnReadMessage = statuses.filter( messageStatus => !messageStatus.users.includes(chatDb.userId) ).length;

    return (
            isScrollEnd
            ? null
            : <div className="block-statusedAndGoEnd">
                  {
                      !countUnReadMessage
                      ? null
                      : <div className="block-statusedAndGoEnd-unread">
                              {countUnReadMessage}
                        </div>
                  }

                  <button className="block-statusedAndGoEnd-button" onClick={handleClick}>
                      <IoIosArrowDown />
                  </button>
            </div>
    )
}

const mapStateToProps = store => {
    return {
        statuses: store.chat.statuses
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StatusedAndGoEnd)
