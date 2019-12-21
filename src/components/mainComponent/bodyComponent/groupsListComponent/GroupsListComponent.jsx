import React, { Component } from "react";

import ir from '../../../../img/iv.png';
import Irregular_verbs from "../irregularVerbsPage/Irregular_verbs"
import GroupsListRowComponent from "./GroupsListRowComponent";
import { getUserGroups, getNewGroup, addNewGroup } from "../../../../services/requests"


export default function GroupsListComponent({ id, onUserPlacePageChange, onLogOut }) {
    const [userGroups, setUserGroups] = React.useState(null);
    React.useEffect(() => {
        if (userGroups == null) {
            (async () => {
                let groups = await getUserGroups(id);
                setUserGroups(groups);
            })();
        }
    });
    
    if (userGroups != null) {
        return (
            <div>
                <div className="header">
                    <div className="container">
                        <div className="flex-container">
                            <div className="flex-block-3" style={{ textAlign: 'left' }}>
                                <div className='logo'>Groups</div>
                            </div>
                            <div className="flex-block-3" style={{ textAlign: 'center' }}>
                                <button className='mybutton'>
                                    <i className="material-icons">done_all</i>
                                </button>
                            </div>
                            <div className="flex-block-3" style={{ textAlign: 'right' }}>
                                <button className='mybutton' onClick={() => onLogOut()}>
                                    <i className="material-icons">exit_to_app</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    {
                        userGroups.map(function (row, i) {
                            return (
                                <GroupsListRowComponent key={i} row={row} index={i} onUserPlacePageChange={onUserPlacePageChange} />
                            )
                        })
                    }
                </div>
            </div>
        )
    } else if (userGroups == null) {
        return (
            <p>Загрузка...</p>
        )
    }


}

// export default class GroupsListComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { userGroups: '', newGroup: '', irregularVerbsComponent: false, activeGroupID: '' }

//         this.newGroupChange = this.newGroupChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.toggleTrue = this.toggleTrue.bind(this);
//         this.toggleFalse = this.toggleFalse.bind(this);
//     }

//     componentDidMount() {
//         getUserGroups(this.props.userID, ({ userGroups }) => {
//             this.setState({ userGroups: userGroups });
//         });
//     }

//     newGroupChange(e) {
//         let newGroup = e.target.value;
//         this.setState({ newGroup: newGroup });
//     }
//     onSubmit(e) {
//         e.preventDefault();
//         if (this.state.newGroup != '') {
//             addNewGroup(this.props.userID, this.state.newGroup, (data) => {
//                 this.setState({ userGroups: data, newGroup: '' })
//             });
//         } else {
//             alert("Придумайте название новой группы");
//         }
//     }
//     toggleTrue() {
//         this.props.onToggleChange(true);
//     }
//     toggleFalse(activeGroupID, activeGroupName) {
//         this.props.onToggleChange(false, activeGroupID, activeGroupName);
//     }
//     // renderGroupsList() {
//     //     if (this.state.userGroups != '' || this.state.userGroups.length != 0) {
//     //         return (
//     //             <div>
//     //                 {//выводим список
//     //                     this.state.userGroups.map(function (row, i) {
//     //                         return (
//     //                             <GroupsListRowComponent key={i} row={row} index={i} onChange={this.toggleFalse} />
//     //                         )
//     //                     }.bind(this))
//     //                 }
//     //             </div>
//     //         )
//     //     } else {
//     //         return (
//     //             <p>Вы еще не создали ниодной группы!</p>
//     //         )
//     //     }
//     // }
//     render() {
//         return (
//             <div>
//                 <h1 className="text-center">GroupsList:</h1>
//                 <div className="card m-1" onClick={this.toggleTrue}>
//                     <div className="card-body p-2">
//                         <div className="row justify-content-around align-items-center m-0 p-0">
//                             <div className="col-4 m-0 p-0"><img src={ir} width='40px;'></img></div>
//                             <div className="col-8 m-0 p-0">I|R</div>
//                             {/* <div className="col-1 text-right"><a href="#" >Х</a></div> */}
//                         </div>
//                     </div>
//                 </div>
//                 {this.renderGroupsList()}
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <input type="text" className="form-control" value={this.state.newGroup || ''} onChange={this.newGroupChange}></input>
//                         <button type="submit" className="btn btn-outline-dark">Добавить</button>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }