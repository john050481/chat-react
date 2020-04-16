export function getCacheEmojis(url='') {
    if (!url) return []

    let emojis = sessionStorage.getItem(url);
    if (emojis) {
        try {
            emojis = JSON.parse(emojis);
            emojis = !Array.isArray(emojis) ? [] : emojis;
            return emojis;
        } catch(e) {
            console.log('getCacheEmojis -> ERROR!!! = ', e);
            return [];
        }
    }
    return [];
}

export function setCacheEmojis(url='', emojis=[]) {
    if (Array.isArray(emojis) && url)
        emojis.length && sessionStorage.setItem(url, JSON.stringify(emojis));
}
