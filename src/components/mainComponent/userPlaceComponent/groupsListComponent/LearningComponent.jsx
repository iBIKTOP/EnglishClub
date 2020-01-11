import React from "react";

import { startLearning } from "../../../../services/requests";

export default function LearningComponent({ arr, onSetPage }) {
    console.log("LearningComponent");
    const [words, setWords] = React.useState(null);
    React.useEffect(() => {
        if (words == null) {
            (async () => {
                setWords(await startLearning(arr));
            })();
        }
    });
    return (
        <div>
            <div className="container">
                <div className="flex-container">
                    <div className="flex-block-1" style={{ textAlign: 'left' }}>
                        <button className='mybutton' onClick={() => onSetPage('groupList')}>
                            <i className="material-icons">arrow_back</i>
                        </button>
                    </div>
                </div>
            </div>
            <div>learning</div>
        </div>

    )
}


