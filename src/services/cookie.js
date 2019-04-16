export function setCookie(userID) {
    document.cookie = `ID=${userID}; path=/; expires=${(new Date(Date.now() + 1000 * 60 * 60 * 24)).toUTCString()}`;
}
export function getCookie(id, callback) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + id.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    matches ? callback(decodeURIComponent(matches[1])) : callback('');
}
export function deleteCookie() {
    document.cookie = `ID=''; path=/; expires=${(new Date(Date.now() - 100000)).toUTCString()}`;
}