import React from 'react'
import './style.css'
import {clearCitation} from "../../../../redux/actions";
import {connect} from "react-redux";

function Citation(props) {
    return (
        <div className="citation-component">
            <div>{props.citation.author}</div>
            <p>{props.citation.text}</p>
            <button className="citation-button close" onClick={props.clearCitation}>x</button>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        citation: store.chat.citation
    }
}
const mapDispatchToProps = {
    clearCitation
}

export default connect(mapStateToProps, mapDispatchToProps)(Citation)