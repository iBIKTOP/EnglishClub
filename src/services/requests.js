export function getWords(callback) {
    fetch("http://192.168.4.129:5000")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);//парсим JSON, создаем объект
            console.log(data);
            callback({ catalog: data });
        })
        .catch(function (error) {
            log('Request failed', error)
        });
};
export function getUsers(callback) {
    fetch("http://192.168.4.129:5000/users")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);//парсим JSON, создаем объект
            console.log(data);
            callback({ users: data });
        })
        .catch(function (error) {
            log('Request failed', error)
        });
};
export function addUser(login, pass, callback) {
    console.log(JSON.stringify({login: login, pass: pass}));
    fetch("http://192.168.4.129:5000/addUser", 
        {   method: 'post', 
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `login=${login}&pass=${pass}`
        })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);//парсим JSON, создаем объект
            console.log(data);
            callback({ user: data });
        })
        .catch(function (error) {
            log('Request failed', error)
        });
};
// async function getWords() {
//     try {
//         let res = await fetch('http://192.168.0.188:5000');
//         console.log(res);
//         let data = await res.json();
//         return data;
//     } catch{
//         throw new Error("Чтото не так с запросом!!!");
//     }
// }

// export function getWords2(callback) {
//     (async function () {
//         try {
//             let data = await getWords();
//             callback({ catalog: data });
//         } catch (error) {
//             console.log(error);
//         }
//     })();
// }