import React, {useState} from 'react'
import './style.css'

export default function (props) {
    const [emoji, setEmoji] = useState([]);

    function handlerClickOnEmoji(e) {
        let target = e.target;
        if (!target.classList.contains('emojiItem')) return;

        let text = target.innerText;
        console.dir(text);
        return text;
    }

    return (
        <div onClick={(e) => {handlerClickOnEmoji(e)}}>
            <button onClick={(e) => {getEmoji(setEmoji)}}>GetEmoji</button>
            <hr/>
            {emoji.map(item => <span key={item.codes} className='emojiItem'>{item.char}</span>)}
            {/*emoji.map(item => <span className='emojiItem' >{item}</span>)*/}
        </div>
    )
}

async function getEmoji(setEmoji) {
    let emoji = localStorage.getItem('emoji')
    if (localStorage.getItem('emoji')) {
        emoji = JSON.parse(emoji);
        console.log('emoji from localStorage', emoji);
        setEmoji(emoji);
        return emoji;
    }

    let url = 'https://unpkg.com/emoji.json/emoji.json';
    //let url = 'https://unpkg.com/emoji.json/emoji-compact.json';
    let response = await fetch(url);
    emoji = await response.json(); // читаем ответ в формате JSON
    localStorage.setItem('emoji', JSON.stringify(emoji));
    console.log('emoji from fetch = ', emoji);
    setEmoji(emoji);
    return emoji;
}
