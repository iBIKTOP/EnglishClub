export function setCookie(userName) {
    document.cookie = `name=${userName}; path=/; expires=${(new Date(Date.now() + 1000 * 60 * 60 * 24)).toUTCString()}`;
}
export function getCookie(name, callback) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    matches ? callback(decodeURIComponent(matches[1])) : callback('');
}
export function deleteCookie() {
    document.cookie = `name=''; path=/; expires=${(new Date(Date.now() - 100000)).toUTCString()}`;
}