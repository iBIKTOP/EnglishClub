import React, { Component } from "react";

export default class GroupsListRowComponent extends Component {
    constructor(props) {
        super(props);
        this.onClickItem = this.onClickItem.bind(this);
    }

    onClickItem() {
        this.props.onChange(this.props.row);
    }
    render() {
        return (
            <div className="card m-1" onClick={this.onClickItem}>
                <div className="card-body p-2">
                    <div className="row justify-content-around m-0 p-0">
                        {/* <div className="col-1"><a href="#" >Х</a></div> */}
                        <div className="col-12">{this.props.row.group_name}</div>
                        {/* <div className="col-1 text-right"><a href="#" >Х</a></div> */}
                    </div>
                </div>
            </div>
        )
    }
}