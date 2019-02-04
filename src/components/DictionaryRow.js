import React, { Component } from "react";

class DictionaryRow extends Component {
    render() {
        return (
            <div className="card m-1">
                <div className="card-body p-2">
                    <div className="row justify-content-around">
                        <div className="col-5">{this.props.row.eng}</div>
                        <div className="col-1">-</div>
                        <div className="col-5">{this.props.row.rus}</div>
                        <div className="col-1 text-right"><a href="#" >Х</a></div>
                    </div>
                </div>
                <div className="card-footer text-right m-0 p-0 pr-2">Катигория: {this.props.row.group}</div>
            </div>
        )
    }
}

export default DictionaryRow;