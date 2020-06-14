import './style.css'
import React from 'react'
import {IoIosArrowDown} from 'react-icons/io';
import useCountUnReadMessage from '../../../../../hooks/useCountUnReadMessage'

export default function StatusedAndGoEnd(props) {
    console.log('Render StatusedAndGoEnd');

    const {messageBlockScroll, isScrollEnd} = props;

    const countUnReadMessage = useCountUnReadMessage();

    function handleClick(e) {
        if (!messageBlockScroll.current)
            return;

        messageBlockScroll.current.scrollTop = messageBlockScroll.current.scrollHeight;
    }

    return (
            isScrollEnd
            ? null
            : <div className="block-statusedAndGoEnd">
                  {
                      !countUnReadMessage
                      ? null
                      : <span className="block-statusedAndGoEnd-unread">
                              {countUnReadMessage}
                        </span>
                  }

                  <button className="block-statusedAndGoEnd-button" onClick={handleClick}>
                      <IoIosArrowDown />
                  </button>
            </div>
    )
}
