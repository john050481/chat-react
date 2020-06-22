import './style.css'
import React from 'react'
import {IoIosArrowDown} from 'react-icons/io';
import useCountUnReadMessage from '../../../../../hooks/useCountUnReadMessage'

export default function GoEndButton(props) {
    console.log('Render GoEndButton');

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
            : <div className="block-GoEndButton">
                  {
                      !countUnReadMessage
                      ? null
                      : <span className="block-GoEndButton-unread">
                              {countUnReadMessage}
                        </span>
                  }

                  <button className="block-GoEndButton-button" onClick={handleClick}>
                      <IoIosArrowDown />
                  </button>
            </div>
    )
}
