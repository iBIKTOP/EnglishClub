import React, { Component } from "react";

export default function SearchRowComponent({ row, onSave }) {
    let saveRow = () => {
        onSave(row);
    }
    return (
        <div className='flex-container rowPlace' onClick={saveRow}>
            <div className='flex-block-3 rowItem' style={{ textAlign: 'right' }}><b>{row.eng}</b> {row.transcription}</div>
            <div className='flex-block-1 rowItem' style={{ textAlign: 'center' }}><b> - </b></div>
            <div className='flex-block-3 rowItem' style={{ textAlign: 'left' }}><b>{row.rus}</b></div>
        </div>
    )
}