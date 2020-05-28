export function printFormatDate(dateMs) {
    const parsedDate = parseInt(dateMs);

    if (isNaN(parsedDate))
        return "- | -"

    const date = new Date(parsedDate);
    return  `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`
}

export function diffDateInDays(date1ms, date2ms) {
    const parsedDate1 = parseInt(date1ms);
    const parsedDate2 = parseInt(date2ms);

    if (isNaN(parsedDate1) || isNaN(parsedDate2))
        return NaN

    return Math.floor( (date1ms - date2ms)/1000/60/60/24 );
}

export function printFormatDaysAgo(amountOfDays) {
    const parsedDate = parseInt(amountOfDays);

    if (isNaN(parsedDate))
        return ""

    if (parsedDate === 0) {
        return "today"
    }
    return `${parsedDate} days ago`
}