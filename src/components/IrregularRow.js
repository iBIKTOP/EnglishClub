import React, { Component } from "react";

class IrregularRow extends Component {
    render() {
        return (
            // <tr>
            //     <th scope="row">{this.props.i}</th>
            //     <td>{this.props.row.infinitive}</td>
            //     <td>{this.props.row.t1}</td>
            //     <td>{this.props.row.past_simple}</td>
            //     <td>{this.props.row.t2}</td>
            //     <td>{this.props.row.past_participle}</td>
            //     <td>{this.props.row.t3}</td>
            //     <td>{this.props.row.translate}</td>
            // </tr>
            <div className='row'>
                <div className='col-2'>
                    <div className='row m-0 p-0'>
                        <div className='col-6 m-0 p-0 font-weight-bold'>{this.props.row.infinitive}</div>
                        <div className='col-6 m-0 p-0'>{this.props.row.t1}</div>
                    </div>
                </div>
                <div className='col-2'>
                    <div className='row m-0 p-0'>
                        <div className='col-6 m-0 p-0 font-weight-bold'>{this.props.row.past_simple}</div>
                        <div className='col-6 m-0 p-0'>{this.props.row.t2}</div>
                    </div>
                </div>
                <div className='col-2'>
                    <div className='row m-0 p-0 '>
                        <div className='col-6 m-0 p-0 font-weight-bold'>{this.props.row.past_participle}</div>
                        <div className='col-6 m-0 p-0'>{this.props.row.t3}</div>
                    </div>
                </div>
                <div className='col-2 font-weight-bold'>{this.props.row.translate}</div>
                <div className='col-2'><button className='btn'>1</button></div>
                <div className='col-2'><button className='btn'>2</button></div>
            </div>
        )
    }
}

export default IrregularRow;