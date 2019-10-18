export function getUserGroups(userID) {
    console.log(userID);
    return new Promise((resolve, reject) => {
        fetch(`http://18.130.38.194:5000/userGroups/${userID}`)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                let groups = JSON.parse(data);
                resolve(groups);
            })
            .catch(function (error) {
                console.log('Request failed', error)
            });
    });

};

export function getUser(id) {

    return new Promise((resolve, reject) => {
        fetch(`http://18.130.38.194:5000/usersId/${id}`)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                data = JSON.parse(data);
                resolve(data[0]);
            })
            .catch(function (error) {
                console.log('Request failed', error)
            });
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

//проверка логина при регистрации или логировании
export const authentication = (login, pass) => {
    return new Promise((resolve, reject) => {
        fetch("http://18.130.38.194:5000/authentication/",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: login, pass: pass })
            })
            .then(response => response.text())
            .then(data => {
                data = JSON.parse(data);
                resolve(data[0]);
            })
            .catch(error => console.log('Request failed', error));
    })
};

export const getLogin = (login) => {
    return new Promise((resolve, reject) => {
        fetch("http://18.130.38.194:5000/getLogin/",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: login })
            })
            .then(response => response.text())
            .then(data => {
                data = JSON.parse(data);
                resolve(data[0]);
            })
            .catch(error => console.log('Request failed', error));
    })
};

export function getWordsList(groupID) {
    return new Promise((resolve, reject) => {
        fetch(`http://18.130.38.194:5000/userGroupWords/${groupID}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            resolve(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
    });
    
}

export function addUser(login, pass) {
    return new Promise((resolve, reject) => {
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
                resolve(data);
            })
            .catch(function (error) {
                console.log('Request failed', error)
            });
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

export function deleteWord(groupID, wordID) {
    return new Promise((resolve, reject) => {
        fetch(`http://18.130.38.194:5000/deleteWord/${groupID}/${wordID}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            resolve(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
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