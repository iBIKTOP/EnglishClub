export function setCookie(userID) {
    document.cookie = `ID=${userID}; path=/; expires=${(new Date(Date.now() + 1000 * 60 * 60 * 24)).toUTCString()}`;
}
export function getCookie(id, callback1, callback2) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + id.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    matches ? callback1(decodeURIComponent(matches[1])) : callback1('');
    matches ? callback2(decodeURIComponent(matches[1])) : callback2('');
}
export function deleteCookie() {
    document.cookie = `ID=''; path=/; expires=${(new Date(Date.now() - 100000)).toUTCString()}`;
}