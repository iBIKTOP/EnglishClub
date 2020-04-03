import React from "react";

import { startLearning, updateLevelForWord } from "../../../../services/requests";

export default function LearningComponent({ learningArr, onSetPage }) {
    const [allDone, setAllDone] = React.useState(null);
    const [words, setWords] = React.useState(null);
    const [phrase, setPhrase] = React.useState(null);

    React.useEffect(() => {
        if (words == null) setUpWords();
        if (words != null && phrase == null) nextWord();
    });

    let setUpWords = async () => {
        let data = await startLearning(learningArr);
        let lvl1 = [];
        let lvl2 = [];
        let lvl3 = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].level == 1) lvl1.push(data[i]);
            if (data[i].level == 2) lvl2.push(data[i]);
            if (data[i].level == 3 || data[i].level == '' || data[i].level == 0) lvl3.push(data[i]);
        }
        if (lvl2.length > 0 || lvl3.length > 0) setWords([lvl1, lvl2, lvl3]);
        else if (lvl2.length == 0 && lvl3.length == 0) setAllDone("All Done");
    }

    let nextWord = () => {
        let setUpPhrase = (level) => {
            if (words[1].length == 0 && words[2].length == 0) {
                setAllDone("All Done");
                setUpWords(); // для отображения статистики
            }
            else {
                if (words[level - 1].length == 0) nextWord();
                else if (words[level - 1].length > 0) {
                    let temp = words;
                    let randIndex = rand(0, temp[level - 1].length);
                    let phrase1 = words[level - 1][randIndex];
                    setPhrase(phrase1);
                    temp[level - 1].splice(randIndex, 1);
                    setWords(temp);
                }
            }
        }
        let randomPercent = rand(0, 100);
        if (randomPercent >= 0 && randomPercent <= 20) setUpPhrase(1);
        if (randomPercent >= 21 && randomPercent <= 60) setUpPhrase(2);
        if (randomPercent >= 61 && randomPercent <= 100) setUpPhrase(3);
    }

    let rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

    let changeLevel = (level) => {
        updateLevelForWord(phrase.id, level);
        toggleMenuPlace();
    }

    let toggleMenuPlace = () => {
        let eng = document.getElementById("engPlace");
        let menuPlace = document.getElementById('menuPlace');
        let nextPlace = document.getElementById('nextPlace');
        eng.innerHTML = `<div><div>${phrase.eng}</div><div>${phrase.transcription}</div></div>`
        menuPlace.style.left = '-100%';
        nextPlace.style.left = '0';
    }

    let toNextPhrase = () => {
        let eng = document.getElementById("engPlace");
        let menuPlace = document.getElementById('menuPlace');
        let nextPlace = document.getElementById('nextPlace');
        eng.innerHTML = `<div>?</div>`
        menuPlace.style.left = '0';
        nextPlace.style.left = '-100%';
        nextWord();
    }

    let rusColor = () => {
        if (phrase.level == 1) return 'rgb(150, 150, 255)';
        if (phrase.level == 2) return 'rgb(255, 255, 150)';
        if (phrase.level == 3 || phrase.level == 0) return 'rgb(255, 150, 150)';
    }

    if (allDone == null) {
        if (phrase != null) {
            return (
                <div>
                    <div id="commonPlace" style={{ backgroundColor: rusColor() }}>
                        <div id="statisticPlace"><div>Знаю: {words[0].length}; Сомневаюсь: {words[1].length}; Не знаю: {words[2].length}</div></div>
                        <div id="rusPlace"><div>{phrase.rus}</div></div>
                        <div id="engPlace"><div>?</div></div>
                        <div id="menuPlace">
                            <div>
                                <button className="btn btn-blue" onClick={() => changeLevel(1)}>Знаю</button><br />
                                <button className="btn btn-yellow" onClick={() => changeLevel(2)}>Сомневаюсь</button><br />
                                <button className="btn btn-red" onClick={() => changeLevel(3)}>Не знаю</button><br />
                                <button className="btn btn-green btn-small" onClick={() => onSetPage('groupList')}><i className="material-icons">arrow_back</i></button>
                            </div>
                        </div>
                        <div id="nextPlace">
                            <div>
                                <button className="btn btn-green" onClick={toNextPhrase}>Далее</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (phrase == null) {
            return (
                <div className="spinner"></div>
            )
        }
    }
    else if (allDone != null) {
        return (
            <div>
                <div id="commonPlace">
                    <div id="finalPlace">
                        <div>
                            <div><span className="btn-green">{words[0].length}</span> / <span className="btn-yellow">{words[1].length}</span> / <span className="btn-red">{words[2].length}</span></div>
                            Вы завершили урок. <br />
                            Желаете начать заново?
                            <button className="btn btn-green" onClick={() => { setUpWords(); setAllDone(null) }}>Да, желаю!</button>
                        </div>
                    </div>
                    <div id="menuPlace">
                        <div>
                            <button className="btn btn-green btn-small" onClick={() => onSetPage('groupList')}><i className="material-icons">arrow_back</i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


