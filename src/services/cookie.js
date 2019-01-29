export function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
}
export function deleteCookie(){
    document.cookie = `name=''; path=/; expires=${(new Date(Date.now()-100000)).toUTCString()}`;             
}