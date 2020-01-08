import React, { Component } from "react";

export default function GroupsListRowComponent({ row, onUserPlacePageChange, groupWordsChange }) {
    let getChecked = () => {
        return row.checked == 0 ? 'check_box_outline_blank' : 'check_box'
    }
    return (
        <div className="groupsRow">
            <div className="flex-container">
                <div className="flex-block-1 groupsRowItem" style={{ textAlign: 'left' }}>
                    <i className="material-icons icons">{getChecked()}</i>
                </div>
                <div className="flex-block-9 groupsRowItem" style={{ textAlign: 'left' }} >
                    {row.group_name}
                </div>
                <div className="flex-block-1 groupsRowItem" style={{ textAlign: 'right' }} onClick={() => { onUserPlacePageChange('wordsList'); groupWordsChange(row); }}>
                    <i className="material-icons icons">edit</i>
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