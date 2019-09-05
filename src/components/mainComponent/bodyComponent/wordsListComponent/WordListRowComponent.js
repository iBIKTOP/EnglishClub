import React, { Component } from "react";

export default class WordListRowComponent extends Component {
    constructor(props){
        super(props);
        this.onClickDelete = this.onClickDelete.bind(this);
    }
    onClickDelete(){
        this.props.onDel(this.props.row.id);
    }
    render() {
        return (
            <div className='flex-container rowStyle'>
                <div className='flex-block-3' style={{textAlign: 'right'}}><b>{this.props.row.eng}</b></div>
                <div className='flex-block-1' style={{textAlign: 'center'}}><b> - </b></div>
                <div className='flex-block-3' style={{textAlign: 'left'}}><b>{this.props.row.rus}</b></div>
                <div className="flex-block-1" style={{textAlign: 'right'}} onClick={this.onClickDelete}><i className="material-icons">close</i></div>
            </div>
        )
    }
}