import React, { Component } from "react";

class IrregularRow extends Component {
    render() {
        return (
            <div className='flex-container irregular_row'>
                <div className='flex-block'><b>{this.props.row.infinitive}</b> {this.props.row.t1}</div>
                <div className='flex-block'><b>{this.props.row.past_simple}</b> {this.props.row.t2}</div>
                <div className='flex-block'><b>{this.props.row.past_participle}</b> {this.props.row.t3}</div>
                <div className='flex-block'><b>{this.props.row.translate}</b></div>
            </div>
        )
    }
}

export default IrregularRow;