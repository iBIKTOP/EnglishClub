import React, { Component } from "react";


export default function GroupsListRowComponent({ row, onuserPlacePageChange }) {
    return (
        <div className="groupsRow">
            <div className="flex-container">
                <div className="flex-block-1 groupsRowItem" style={{ textAlign: 'left' }}>
                    <i class="material-icons icons">check_box_outline_blank</i>
                </div>
                <div className="flex-block-9 groupsRowItem" style={{ textAlign: 'left' }} >
                    {row.group_name}
                </div>
                <div className="flex-block-1 groupsRowItem" style={{ textAlign: 'right' }} onClick={() => { onuserPlacePageChange('wordsList', row) }}>
                    <i class="material-icons icons">edit</i>
                </div>
               
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