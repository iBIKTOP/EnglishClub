import React, { Component } from "react";

class IrregularRow extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.i}</th>
                <td>{this.props.row.infinitive}</td>
                <td>{this.props.row.t1}</td>
                <td>{this.props.row.past_simple}</td>
                <td>{this.props.row.t2}</td>
                <td>{this.props.row.past_participle}</td>
                <td>{this.props.row.t3}</td>
                <td>{this.props.row.translate}</td>
            </tr>
        )
    }
}

export default IrregularRow;