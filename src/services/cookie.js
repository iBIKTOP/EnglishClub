export function setCookie(userID) {
    document.cookie = `ID=${userID}; path=/; expires=${(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)).toUTCString()}`; // 7 days
}
export function getCookie(id) {
    return new Promise((resolve, reject) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + id.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        matches ? resolve(decodeURIComponent(matches[1])) : resolve('');
    });

}
export function deleteCookie() {
    document.cookie = `ID=''; path=/; expires=${(new Date(Date.now() - 100000)).toUTCString()}`;
}