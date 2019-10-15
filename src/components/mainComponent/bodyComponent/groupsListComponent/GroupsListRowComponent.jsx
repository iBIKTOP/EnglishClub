import React, { Component } from "react";


export default function GroupsListRowComponent({ row, onuserPlacePageChange }) {
    return (
        <div>
            <div className="mycard-body" onClick={() => { onuserPlacePageChange('wordsList') }}>
                {row.group_name}
            </div>
        </div>

    )
}
// export default class GroupsListRowComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.onClickItem = this.onClickItem.bind(this);
//     }

//     onClickItem() {
//         this.props.setWordsList(this.props.row);
//     }
//     render() {
//         return (
//             <div className={this.props.groupsClass} onClick={this.onClickItem}>
//                 <div className="mycard-body">
//                     {this.props.row.group_name}
//                 </div>
//             </div>

//         )
//     }
// }