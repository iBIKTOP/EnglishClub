export const getUserGroups = async (userID) => {
    try {
        let response = await fetch(`http://18.130.38.194:5000/userGroups/`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: userID })
            });
        let data = await response.text();
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Server doesn't answer");
    }
};

export const getUser = async (id) => {
    let response = await fetch(`http://18.130.38.194:5000/usersId/${id}`);
    let data = await response.text();
    let user = JSON.parse(data);
    return user[0];
};

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
            callback(data);
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
};

//проверка логина при регистрации или логировании
export const authentication = async (login, pass) => {
    try {
        let response = await fetch("http://18.130.38.194:5000/authentication/",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: login, pass: pass })
            });
        let data = await response.text();
        let user = JSON.parse(data);
        return user[0];
    }
    catch (error) {
        console.log("Server doesn't answer", error);
    }
};

export const getLogin = async (login) => {
    try {
        let response = await fetch("http://18.130.38.194:5000/getLogin/",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: login })
            });
        let data = await response.text();
        let user = JSON.parse(data);
        return user[0];
    }
    catch (error) {
        console.log("Server doesn't answer", error);
    }
};

export const getWordsList = async (groupID) => {
    try {
        let response = await fetch(`http://18.130.38.194:5000/userGroupWords/${groupID}`);
        return await response.json();
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
}

export const addUser = async (login, pass) => {
    try {
        let response = await fetch("http://18.130.38.194:5000/addUser",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: login, pass: pass })
            });
        let data = await response.text();
        let user = JSON.parse(data);
        return user[0];
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
};

export const addNewGroup = async (userID, newGroup) => {
    try {
        let response = await fetch("http://18.130.38.194:5000/urerGroups/addNewGroup",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: userID, newGroup: newGroup })
            })
        let data = await response.text();
        let group = JSON.parse(data);
        // console.log(group);
        return group[0];
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
}

export const updateGroupName = async (groupID, userID, groupName) => {
    try {
        let response = await fetch("http://18.130.38.194:5000/urerGroups/updateGroupName",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ groupID: groupID, userID: userID, groupName: groupName })
            });
        console.log(await response.text());
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
}

export const updateChecked = async (wordID, checked) => {
    try {
        let response = await fetch("http://18.130.38.194:5000/groupWords/updateChecked",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ wordID: wordID, checked: checked })
            });
        console.log(await response.text());
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
}

export const startLearning = async (arr) => {
    try {
        let response = await fetch("http://18.130.38.194:5000/startLearning",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ arr: arr })
            });
        return await response.json();
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
}

export const getAllWords = async () => {
    try {
        let response = await fetch("http://18.130.38.194:5000/words/getAllWords");
        let data = await response.text();
        return JSON.parse(data);
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
};

// let data = require('./words.json');                    не удалять!!!
// export const words = async () => {
//     for (let key1 in data) {
//         for (let key2 in data[key1]) {
//             for (let i = 0; i < data[key1][key2].length; i++) {
//                 if (data[key1][key2][i] == undefined) continue;
//                 let phrase = data[key1][key2][i].phrase;
//                 let translation = data[key1][key2][i].translation;
//                 let transcription = data[key1][key2][i].transcription;
//                 console.log('Подготовка к отправке: ', phrase, translation, transcription);
//                 try {
//                     let response = await fetch("http://18.130.38.194:5000/addWords",
//                         {
//                             method: "POST",
//                             headers: {
//                                 'Accept': 'application/json',
//                                 'Content-Type': 'application/json'
//                             },
//                             body: JSON.stringify({ newEng: phrase, newRus: translation, transcription: transcription })
//                         });
//                     let data = await response.text();
//                     console.log('WordList is updated, ', data);
//                 }
//                 catch (error) {
//                     // console.log(new Error("Server doesn't answer!!!", error));
//                     console.log("Ошибка catch: ", error);
//                 }
//             }
//         }
//     }
// }

export const addNewWord = async (groupID, newEng, newRus) => {
    try {
        let response = await fetch("http://18.130.38.194:5000/addNewWord",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ groupID: groupID, newEng: newEng, newRus: newRus })
            });
        let data = await response.text();
        // return JSON.parse(data);
        console.log('WordList is updated');
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
}

export const addWordToGroup = async (groupID, wordID) => {
    try {
        let response = await fetch(`http://18.130.38.194:5000/addWordToGroup/${groupID}/${wordID}`);
        let data = await response.text();
        // return JSON.parse(data);
        console.log('WordList is updated');
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
}

export const deleteWord = async (groupID, wordID) => {
    let response = await fetch(`http://18.130.38.194:5000/deleteWord`,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ groupID: groupID, wordID: wordID })
        });
    let wordsList = await response.text();
    return JSON.parse(wordsList);
}

export const updateLevelForWord = async (wordID, level) => {
    let response = await fetch(`http://18.130.38.194:5000/updateLevelForWord`,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ wordID: wordID, level: level })
        });
    console.log(await response.text());
}
export const getTranslateWooodHunter = async (phrase) => {
    try {
        let response = await fetch(`http://18.130.38.194:5000/translate`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phrase: phrase })
            });
        return await response.text();
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }

}