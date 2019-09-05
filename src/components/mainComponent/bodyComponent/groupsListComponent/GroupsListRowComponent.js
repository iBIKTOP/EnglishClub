import React, { Component } from "react";

export default class GroupsListRowComponent extends Component {
    constructor(props) {
        super(props);
        this.onClickItem = this.onClickItem.bind(this);
    }

    onClickItem() {
        this.props.onChange(this.props.row.id, this.props.row.group_name);
    }
    render() {
        return (
            <div className="card m-1" onClick={this.onClickItem}>
                <div className="card-body p-2">
                    <div className="flex-container">
                        {/* <div className="col-1"><a href="#" >Х</a></div> */}
                        <div className="flex-block-3">{this.props.row.group_name}</div>
                    </div>
                </div>
            </div>

        )
    }
}