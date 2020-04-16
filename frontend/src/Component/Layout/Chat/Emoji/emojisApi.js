import {getCacheEmojis, setCacheEmojis} from './cacheEmogis'

//https://emoji-api.com
const access_key  = 'e6c2547d35f02e32b3007c510d7254c2fd5ee50d'

export default async function (options, callBack) {
    let {search, singleEmoji, categories, category} = options;

    let url = '';
    if (search) {
        url = `https://emoji-api.com/emojis?search=${search}&access_key=${access_key}`
    } else if (singleEmoji) {
        url = `https://emoji-api.com/emojis/${singleEmoji}?access_key=${access_key}`
    } else if (categories) {
        url = `https://emoji-api.com/categories?access_key=${access_key}`
    } else if (category) {
        url = `https://emoji-api.com/categories/${category}?access_key=${access_key}`
    } else { //All
        url = `https://emoji-api.com/emojis?access_key=${access_key}`
    }

    let cachedEmojis = getCacheEmojis(url);
    if (cachedEmojis.length) {
        console.log('API -> CACHE, lengthArrEmojis = ', cachedEmojis.length);
        return cachedEmojis
    }

    let emojis = [];
    try {
        let response = await fetch(url);
        emojis = await response.json(); // читаем ответ в формате JSON
        console.log('API -> FETCH = ', emojis.length);
    } catch(e) {
        console.log('API -> FETCH -> ERROR!!! = ', e);
    }

    if (!Array.isArray(emojis))
        emojis = []

    setCacheEmojis(url, emojis);
    callBack && callBack(emojis);
    return emojis;
}

/*
https://emoji-api.com/emojis?access_key=e6c2547d35f02e32b3007c510d7254c2fd5ee50d --- emojis
https://emoji-api.com/emojis?search=computer&access_key=e6c2547d35f02e32b3007c510d7254c2fd5ee50d --- emojis --- search_###
https://emoji-api.com/emojis/grinning-squinting-face?access_key=e6c2547d35f02e32b3007c510d7254c2fd5ee50d --- emojis --- singleEmoji_###
https://emoji-api.com/categories?access_key=e6c2547d35f02e32b3007c510d7254c2fd5ee50d --- categories
https://emoji-api.com/categories/travel-places?access_key=e6c2547d35f02e32b3007c510d7254c2fd5ee50d --- categories --- category_###
*/
