import React from 'react'
import './style.css'
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

export default class EmojiList extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ( (nextProps.handlerClickOnEmoji !== this.props.handlerClickOnEmoji) &&
             (nextProps.emojisInState === this.props.emojisInState) &&
             (nextProps.isLoading === this.props.isLoading) )
            return false;

        return true;
    }

    render() {
        console.log('Render Emojis');
        return (
            <div className='emojisBlock'
                onClick={(e) => {this.props.handlerClickOnEmoji(e)}}
            >
                { this.props.isLoading
                  ? <Container className='App-spinner-container message-block-spinner'>
                        <Spinner className='App-spinner' animation="grow" variant="info" />
                    </Container>
                  : this.props.emojisInState.map(item =>
                    <span key={item.character}>
                        {item.character}
                    </span>)
                }
            </div>
        )
    }
}