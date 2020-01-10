import React, { Component } from "react";

export default function WordListRowComponent({ row, onDel }) {
    let onClickDelete = () => {
        onDel(row.id);
    }
    return (
        <div className='flex-container rowStyle'>
            <div className='flex-block-3' style={{ textAlign: 'right' }}><b>{row.eng}</b> {row.transcription}</div>
            <div className='flex-block-1' style={{ textAlign: 'center' }}><b> - </b></div>
            <div className='flex-block-3' style={{ textAlign: 'left' }}><b>{row.rus}</b></div>
            {/* <div className="flex-block-1" style={{ textAlign: 'right' }} onClick={onClickDelete}><i className="material-icons icons">close</i></div> */}
        </div>
    )
}