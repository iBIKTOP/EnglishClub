import React from "react";

export default function AnswerComponent({ answer }) {
    if (answer.translate != '') {
        return (
            <div>
                <div className="flex-container">
                    <div className='flex-block-3' style={{ textAlign: 'center' }}>
                        Phrase:
                </div>
                    <div className='flex-block-3' style={{ textAlign: 'center' }}>
                        <b>{answer.phrase}</b>
                    </div>
                </div>
                <hr />
                <div className="flex-container">
                    <div className='flex-block-3' style={{ textAlign: 'center' }}>
                        Transcription:
                </div>
                    <div className='flex-block-3' style={{ textAlign: 'center' }}>
                        <b>{answer.transcription}</b>
                    </div>
                </div>
                <hr />
                <div className="flex-container">
                    <div className='flex-block-3' style={{ textAlign: 'center' }}>
                        Translation:
                    </div>
                    <div className='flex-block-3' style={{ textAlign: 'left' }}>
                        {
                            answer.translate.map(function (row, i) {
                                return (
                                    <p key={i} id={i}><b>{row}</b></p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    else return <div></div>
}






