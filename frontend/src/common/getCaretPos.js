export default function getCaretPos(element) {
    element.focus();
    if (document.selection) {
        var sel = document.selection.createRange();
        var clone = sel.duplicate();
        sel.collapse(true);
        clone.moveToElementText(element);
        clone.setEndPoint('EndToEnd', sel);
        return clone.text.length;
    } else {
        return window.getSelection().getRangeAt(0).startOffset;
    }
    return 0;
}
