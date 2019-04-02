import React, { Component } from "react";

class IrregularVerbsRow extends Component {
    render() {
        return (
            <div className="card m-1">
                <div className="card-body p-2">
                    <div className="row justify-content-around">
                        <div className="col-5">{this.props.row.id}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default IrregularVerbsRow;