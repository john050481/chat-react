import React from 'react'
import './style.css'

export default class EmojiList extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ( (nextProps.handlerClickOnEmoji !== this.props.handlerClickOnEmoji) &&
             (nextProps.emojisInState === this.props.emojisInState) )
            return false;

        return true;
    }

    render() {
        console.log('Render Emojis');
        return (
            <div className='emojisBlock'
                 onClick={(e) => {this.props.handlerClickOnEmoji(e)}}>
                {this.props.emojisInState.map(item =>
                    <span key={item.character}>
                {item.character}
                </span>)}
            </div>
        )
    }
}