import React, { Component } from "react";

export default function SearchRowComponent({ row, onSave }) {
    let saveRow = () => {
        onSave(row);
    }
    return (
        <div className='flex-container rowStyle' onClick={saveRow}>
            <div className='flex-block-3' style={{ textAlign: 'right' }}><b>{row.eng}</b> {row.transcription}</div>
            <div className='flex-block-1' style={{ textAlign: 'center' }}><b> - </b></div>
            <div className='flex-block-3' style={{ textAlign: 'left' }}><b>{row.rus}</b></div>
            {/* <div className="flex-block-1" style={{ textAlign: 'right' }} onClick={saveRow}><i className="material-icons icons">add</i></div> */}
        </div>
    )
}