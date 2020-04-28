import React, {useState, useEffect} from 'react'
import './style.css'
import Categories from './Categories'
import Emojies from './Emogies'
import Api from './emojisApi'

let timerId = null;

export default function EmojisComponent(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [emojisInState, setEmojisInState] = useState([]);
    const [categoriesInState, setCategoriesInState] = useState([]);
    const [stateFilter, setStateFilter] = useState({search: '', singleEmoji: '', category: ''});

    useEffect(() => {
        async function getEmojisApi(options={}) {
            setIsLoading(true);
            let {search, singleEmoji, categories, category} = options;
            let emojis = await Api(options);
            categories ? setCategoriesInState(emojis) : setEmojisInState(emojis);
            setIsLoading(false);
            return emojis;
        }

        console.log('МОНТИРОВАНИЕ = ', stateFilter);

        if (!categoriesInState.length) getEmojisApi({categories: true});
        console.log('МОНТИРОВАНИЕ_2 после запроса категорий = ', stateFilter);

        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            console.log('TIMER is RUN = ', stateFilter)
            getEmojisApi(stateFilter);
            timerId = null;
        }, 0 + (stateFilter.search ? 1000 : 0))

        return function cleanup() {console.log('РАЗМОНТИРОВАНИЕ');}
    }, [stateFilter.search, stateFilter.singleEmoji, stateFilter.category]);

    function handlerClickOnEmoji(e) {
        let target = e.target;
        if (target.tagName !== "SPAN") return;
        let text = target.innerText;
        props.callback && props.callback(text);
    }

    function handleChangeSearch(e) {
        let value = e.target.value;
        setStateFilter({category: '', search: value});
    }

    function handleClickCategories(e) {
        let category = e.target.dataset.category;
        setStateFilter({category, search: ''});
    }

    return (
        <div className='emojiRootBlock' style={{...props.style}}>
            <Categories
                isLoading={isLoading}
                categoriesInState={categoriesInState}
                handleClickCategories={handleClickCategories}
                currentCategory={stateFilter.category}
            />
            <input
                disabled={isLoading ? true : false}
                type='search'
                placeholder='search'
                className='changeSearch'
                value={stateFilter.search}
                onChange={(e) => {handleChangeSearch(e)}}
            />
            <Emojies
                emojisInState={emojisInState}
                handlerClickOnEmoji={handlerClickOnEmoji}
                isLoading={isLoading}
            />
        </div>
    )
}
