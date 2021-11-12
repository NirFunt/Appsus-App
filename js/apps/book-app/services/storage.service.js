export const storageService = {
    save: saveToLocalStorage,
    load: loadFromLocalStorage,
}

function saveToLocalStorage(key, objValue) {
    var stringifyObj = JSON.stringify(objValue);
    localStorage.setItem(key, stringifyObj);
}

function loadFromLocalStorage(key) {
    var objValue = JSON.parse(localStorage.getItem(key));
    return objValue;
}