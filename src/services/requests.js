export function getUserGroups(userID, setStateUserGroups) {
    if (userID != '') {
        console.log("Запрашиваем слова пользователя с ID = " + userID);
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
                console.log('Request failed', error)
            });
    }
};

export function getUser(id, callback) {
    if (id != '') {
        fetch(`http://18.130.38.194:5000/usersId/${id}`)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                data = JSON.parse(data);
                callback(data[0]);
            })
            .catch(function (error) {
                console.log('Request failed', error)
            });
    }
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
export function addUserIrregularVerbs(id) {
    fetch("http://18.130.38.194:5000/irregular_verbs/addUserIrregularVerbs",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);//парсим JSON, создаем объект
            console.log("Save!");
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
}
export function getIrregularVerbs(id, callback) {
    fetch(`http://18.130.38.194:5000/irregular_verbs/${id}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            // console.log(data);
            callback(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
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
            callback(data[0]);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
};

export function getWordsList(groupID, callback) {
    fetch(`http://18.130.38.194:5000/userGroupWords/${groupID}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            // console.log(data);
            callback(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
}

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
            callback(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
};

export function addNewGroup(userID, newGroup, callback) {
    fetch("http://18.130.38.194:5000/urerGroups/addNewGroup",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID: userID, newGroup: newGroup })
        })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);//парсим JSON, создаем объект
            callback(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
}

export function getAllWords(callback) {
    fetch("http://18.130.38.194:5000/words/getAllWords")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            console.log(data);
            callback(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
};

export function addNewWord(groupID, newEng, newRus, callback) {
    fetch("http://18.130.38.194:5000/addNewWord",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ groupID: groupID, newEng: newEng, newRus: newRus })
        })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);//парсим JSON, создаем объект
            callback(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
}

export function addWordToGroup(groupID, wordID, callback) {
    fetch(`http://18.130.38.194:5000/addWordToGroup/${groupID}/${wordID}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            console.log(data);
            callback(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
}

export function deleteWord(groupID, wordID, callback) {
    fetch(`http://18.130.38.194:5000/deleteWord/${groupID}/${wordID}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            console.log(data);
            callback(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
}

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