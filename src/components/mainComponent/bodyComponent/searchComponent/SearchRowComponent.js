import React, { Component } from "react";

export default class SearchRowComponent extends Component {
    constructor(props) {
        super(props);
        this.saveRow = this.saveRow.bind(this);
        // this.onClickDelete = this.onClickDelete.bind(this);
    }
    // onClickDelete(){
    //     this.props.onDel(this.props.row.id);
    // }
    saveRow() {
        this.props.onSave(this.props.row);
    }
    render() {
        return (
            <div className='flex-container rowStyle'>
                <div className='flex-block-3' style={{ textAlign: 'right' }}><b>{this.props.row.eng}</b></div>
                <div className='flex-block-1' style={{ textAlign: 'center' }}><b> - </b></div>
                <div className='flex-block-3' style={{ textAlign: 'left' }}><b>{this.props.row.rus}</b></div>
                <div className="flex-block-1" style={{ textAlign: 'right' }} onClick={this.saveRow}>ADD</div>
            </div>
        )
    }
}