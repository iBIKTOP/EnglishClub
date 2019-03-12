export function setCookie(userID) {
    document.cookie = `ID=${userID}; path=/; expires=${(new Date(Date.now() + 1000 * 60 * 60 * 24)).toUTCString()}`;
}
export function getCookie(id, setStateID, callback2) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + id.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    //setStateID - callback установка ID пользователя
    matches ? setStateID(decodeURIComponent(matches[1])) : setStateID('');

    matches ? callback2(decodeURIComponent(matches[1])) : callback2('');
}
export function deleteCookie() {
    document.cookie = `ID=''; path=/; expires=${(new Date(Date.now() - 100000)).toUTCString()}`;
}