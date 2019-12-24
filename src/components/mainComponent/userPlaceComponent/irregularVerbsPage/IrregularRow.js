import React, { Component } from "react";

class IrregularRow extends Component {
    render() {
        return (
            <div className='flex-container rowStyle'>
                <div className='flex-block-3'><b>{this.props.row.infinitive}</b><br/>{this.props.row.t1}</div>
                <div className='flex-block-3'><b>{this.props.row.past_simple}</b><br/>{this.props.row.t2}</div>
                <div className='flex-block-3'><b>{this.props.row.past_participle}</b><br/>{this.props.row.t3}</div>
                <div className='flex-block-3'><b>{this.props.row.translate}</b></div>
            </div>
        )
    }
}

export default IrregularRow;