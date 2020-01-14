import React from "react";

import { startLearning } from "../../../../services/requests";

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
        // if(words != null && phrase == null) nextWord();
    });

    let rand = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    let nextWord = () => {
        let randomPercent = rand(0, 100);
        if(randomPercent>=0 && randomPercent<=10) {
            let arr = [];
            for(let i=0; i<words.length; i++){
                if(words[i].level == 1) arr.push(words[i]);
            }
            if(arr.length>0) setPhrase(arr[rand(0, arr.length)]);
            else nextWord();
        }
        if(randomPercent>=11 && randomPercent<=50) {
            let arr = [];
            for(let i=0; i<words.length; i++){
                if(words[i].level == 2) arr.push(words[i]);
            }
            if(arr.length>0) setPhrase(arr[rand(0, arr.length)]);
            else nextWord();
        }
        if(randomPercent>=51 && randomPercent<=100) {
            let arr = [];
            for(let i=0; i<words.length; i++){
                if(words[i].level == 3) arr.push(words[i]);
            }
            if(arr.length>0) setPhrase(arr[rand(0, arr.length)]);
            else nextWord();
        }
    }

    if (phrase != null) {
        return (
            <div>
                <div id="commonPlace">
                    <div id="rusPlace"><div>{phrase.rus}</div></div>
                    <div id="engPlace">
                        <div>
                            <div>{phrase.eng}</div>
                            <div>{phrase.transcription}</div>
                        </div>
                    </div>
                    <div id="menuPlace">
                        <div>
                            <button className="btn btn-blue" onClick={() => nextWord()}>Знаю</button><br />
                            <button className="btn btn-yellow">Сомневаюсь</button><br />
                            <button className="btn btn-red">Не знаю</button><br />
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


