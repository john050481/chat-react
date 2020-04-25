export default function changeFavicon(newUrl) {
    const oldicons = document.querySelectorAll( 'link[rel="icon"], link[rel="shortcut icon"]' );
    for (let i = 0; i < oldicons.length; i++ ) {
        oldicons[i].setAttribute( "href", newUrl );
    }
}
