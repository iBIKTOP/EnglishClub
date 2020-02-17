const fetch = require("node-fetch");
let arr = require('./words2.json');

const words2 = async () => {
    // try {
    //     let response = await fetch(`https://wooordhunt.ru/word/goods`);
    //     let data = await response.text();
    //     console.log(data);
    // }
    // catch (error) {
    //     // console.log(new Error("Server doesn't answer!!!", error));
    //     console.log("Ошибка catch: ", error);
    // }
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i]);
        try {
            let response = await fetch(`https://wooordhunt.ru/word/goods`);
            let data = await response.text();
            console.log(data);
        }
        catch (error) {
            // console.log(new Error("Server doesn't answer!!!", error));
            console.log("Ошибка catch: ", error);
        }
    }




}
words2();