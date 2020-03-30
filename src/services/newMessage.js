export default function newMessage(text) {
    let div = document.createElement('div');
    div.className = 'newMessage';
    div.innerText = text;
    document.body.append(div);
    setTimeout(() => {
        div.style.opacity = 1;
    }, 10);
    setTimeout(() => {
        div.style.opacity = 0;
    }, 1500);
    setTimeout(() => {
        div.remove();
    }, 2500);
}