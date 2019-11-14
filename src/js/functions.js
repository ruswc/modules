// clear form's field
var clearFormField = function clearFormField(elements) {
    for (var i = 0, length = elements.length; i < length; i++) {
        if (elements[i].type === "text" || elements[i].type === "select-one") {
            elements[i].value = "";
        }
    }
}

export {clearFormField}