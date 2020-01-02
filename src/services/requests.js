export const getUserGroups = async (userID) => {
    try{
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
    catch(error){
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
    try{
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
    catch(error){
        console.log("Server doesn't answer", error);
    }
};

export const getLogin = async (login) => {
    try{
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
    catch(error){
        console.log("Server doesn't answer", error);
    }
};

export const getWordsList = async (groupID) => {
    try{
        let response = await fetch(`http://18.130.38.194:5000/userGroupWords/${groupID}`);
        return await response.json();
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
}

export const addUser = async (login, pass) => {
    try{
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

export const getAllWords = async () => {
    try{
        let response = await fetch("http://18.130.38.194:5000/words/getAllWords");
        let data = await response.text();
        return JSON.parse(data);
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
    // fetch("http://18.130.38.194:5000/words/getAllWords")
    //     .then(function (response) {
    //         return response.text();
    //     })
    //     .then(function (data) {
    //         data = JSON.parse(data);
    //         console.log(data);
    //         callback(data);
    //     })
    //     .catch(function (error) {
    //         console.log('Request failed', error)
    //     });
};

export const addNewWord = async (groupID, newEng, newRus) => {
    try{
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
    try{
        let response = await fetch(`http://18.130.38.194:5000/addWordToGroup/${groupID}/${wordID}`);
        let data = await response.text();
        // return JSON.parse(data);
        console.log('WordList is updated');
    }
    catch{
        console.log(new Error("Server doesn't answer!!!"));
    }
    // fetch(`http://18.130.38.194:5000/addWordToGroup/${groupID}/${wordID}`)
    //     .then(function (response) {
    //         return response.text();
    //     })
    //     .then(function (data) {
    //         data = JSON.parse(data);
    //         console.log(data);
    //         callback(data);
    //     })
    //     .catch(function (error) {
    //         console.log('Request failed', error)
    //     });
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