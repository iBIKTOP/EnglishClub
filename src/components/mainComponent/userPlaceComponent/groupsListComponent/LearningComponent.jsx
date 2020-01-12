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
        if (words != null && phrase == null) {
            randomIndex(0, words.length);
        }
    });

    let randomIndex = (min, max) => {
        let randomIndex = Math.floor(Math.random() * (max - min) + min);
        setPhrase(words[randomIndex]);
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
                            <button className="btn btn-blue" onClick={() => randomIndex(0, words.length)}>Знаю</button><br />
                            <button className="btn btn-yellow">Сомневаюсь</button><br />
                            <button className="btn btn-red">Не знаю</button>
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


