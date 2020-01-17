import React from "react";

import { startLearning, updateLevelForWord } from "../../../../services/requests";

export default function LearningComponent({ learningArr, onSetPage }) {
    const [words, setWords] = React.useState(null);
    const [phrase, setPhrase] = React.useState(null);

    React.useEffect(() => {
        if (words == null) {
            (async () => {
                let data = await startLearning(learningArr);
                setWords(data);
            })();
        }
        if(words != null && phrase == null) nextWord();
    });

    let rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
    let toFirstLevel = () => {
        updateLevelForWord(phrase.id, 1);
        nextWord();
    }
    let toSecondLevel = () => {
        updateLevelForWord(phrase.id, 2);
        nextWord();
    }
    let toThirdLevel = () => {
        updateLevelForWord(phrase.id, 3);
        nextWord();
    }
    let nextWord = () => {
        let setUpPhrase = (level) => {
            let arr = [];
            for(let i=0; i<words.length; i++){
                if(words[i].level == level) arr.push(words[i]);
            }
            if(arr.length>0) setPhrase(arr[rand(0, arr.length)]);
            else nextWord();
        }
        let randomPercent = rand(0, 100);
        if(randomPercent>=0 && randomPercent<=10) setUpPhrase(1);
        if(randomPercent>=11 && randomPercent<=50) setUpPhrase(2);
        if(randomPercent>=51 && randomPercent<=100) {
            let arr = [];
            for(let i=0; i<words.length; i++){
                if(words[i].level == 3 || words[i].level == '') arr.push(words[i]);
            }
            if(arr.length>0) setPhrase(arr[rand(0, arr.length)]);
            else nextWord();
        }
    }
    let rusColor = () => {
        console.log(phrase);
        if(phrase.level == 1) return 'rgb(100, 100, 255)';
        if(phrase.level == 2) return 'rgb(255, 255, 100)';
        if(phrase.level == 3 || phrase.level == 0) return 'rgb(255, 100, 100)';
    }

    if (phrase != null) {
        rusColor();
        return (
            <div>
                <div id="commonPlace">
                    <div id="rusPlace" style={{backgroundColor: rusColor()}}><div>{phrase.rus}</div></div>
                    <div id="engPlace">
                        <div>
                            <div>{phrase.eng}</div>
                            <div>{phrase.transcription}</div>
                        </div>
                    </div>
                    <div id="menuPlace">
                        <div>
                            <button className="btn btn-blue" onClick={toFirstLevel}>Знаю</button><br />
                            <button className="btn btn-yellow" onClick={toSecondLevel}>Сомневаюсь</button><br />
                            <button className="btn btn-red" onClick={toThirdLevel}>Не знаю</button><br />
                            <button className="btn btn-green btn-small" onClick={() => onSetPage('groupList')}><i className="material-icons">arrow_back</i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (phrase == null) {
        return (
            <div className="spinner"></div>
        )
    }

}

