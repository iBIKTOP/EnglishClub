import React, { Component } from "react";

class IrregularRow extends Component {
    render() {
        return (
            <div className='row m-1 p-1 irregular_row'>
                <div className='col-3 p-1 align-self-center'><b>{this.props.row.infinitive}</b> {this.props.row.t1}</div>
                <div className='col-3 p-1 align-self-center'><b>{this.props.row.past_simple}</b> {this.props.row.t2}</div>
                <div className='col-3 p-1 align-self-center'><b>{this.props.row.past_participle}</b> {this.props.row.t3}</div>
                <div className='col-3 p-1 align-self-center'><b>{this.props.row.translate}</b></div>
            </div>
        )
    }
}

export default IrregularRow;