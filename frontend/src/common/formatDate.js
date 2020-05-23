export default function formatDate(dateMs) {
    const date = new Date(dateMs);
    return  `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`
}
