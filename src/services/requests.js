export function getUserGroups(userID, setStateUserGroups) {
    console.log("Запрашиваем слова пользователя с ID = " + userID);
    if (userID != '') {
        fetch(`http://18.130.38.194:5000/${userID}`)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                data = JSON.parse(data);
                console.log(data);
                //setStateUserGroups - callback установка списка групп пользователя
                setStateUserGroups({ userGroups: data });
            })
            .catch(function (error) {
                log('Request failed', error)
            });
    }
};

export function getUser(id, callback) {
    fetch(`http://18.130.38.194:5000/usersId/${id}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            console.log("+++++++++");
            console.log(data[0].login);
            callback(data[0].login);
        })
        .catch(function (error) {
            log('Request failed', error)
        });
};
// export function getUsers(callback) {
//     fetch("http://18.130.38.194:5000/users")
//         .then(function (response) {
//             return response.text();
//         })
//         .then(function (data) {
//             data = JSON.parse(data);
//             // console.log(data);
//             callback({ users: data });
//         })
//         .catch(function (error) {
//             log('Request failed', error)
//         });
// };
export function getIrregularVerbs(id, callback) {
    fetch(`http://18.130.38.194:5000/irregular_verbs/${id}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            console.log(data);
            callback(data);
        })
        .catch(function (error) {
            log('Request failed', error)
        });
};

//проверка логина при регистрации
export function getLogin(login, callback) {
    fetch("http://18.130.38.194:5000/usersLogin/" + login)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            console.log(data[0]);
            callback(data[0]);
        })
        .catch(function (error) {
            log('Request failed', error)
        });
};

export function addUser(login, pass, callback) {
    fetch("http://18.130.38.194:5000/addUser",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: login, pass: pass })
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