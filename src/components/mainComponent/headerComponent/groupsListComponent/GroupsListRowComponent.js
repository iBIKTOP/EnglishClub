import React, { Component } from "react";

export default class GroupsListRowComponent extends Component {
    constructor(props) {
        super(props);
        this.onClickItem = this.onClickItem.bind(this);
    }

    onClickItem() {
        this.props.setWordsList(this.props.row.id);
    }
    render() {
        return (
            <div className={this.props.groupsClass} onClick={this.onClickItem}>
                <div className="mycard-body">
                    {this.props.row.group_name}
                </div>
            </div>

        )
    }
}