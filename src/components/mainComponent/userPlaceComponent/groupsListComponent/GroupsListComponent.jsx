import React, { Component } from "react";

import Irregular_verbs from "../irregularVerbsPage/Irregular_verbs"
import GroupsListRowComponent from "./GroupsListRowComponent";
import { getUserGroups, getNewGroup, addNewGroup } from "../../../../services/requests"

export default function GroupsListComponent({ id, onUserPlacePageChange, groupWordsChange }) {
    const [userGroups, setUserGroups] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const [newGroupName, setNewGroupName] = React.useState('');
    React.useEffect(() => {
        if (userGroups == null) {
            (async () => {
                let groups = await getUserGroups(id);
                setUserGroups(groups);
            })();
        }
    });
    let saveNewGroup = async () => {
        let newGroup = await addNewGroup(id, newGroupName);
        groupWordsChange(newGroup);
        onUserPlacePageChange('wordsList');
    }
    let changeGroupName = (e) => setNewGroupName(e.target.value);
    let visibleToggle = () => visible ? setVisible(false) : setVisible(true);
    let creatingNewGroup = () => {
        if(visible){
            return(
                <div>
                <div className="creatingNewGroupBackground" onClick={visibleToggle}></div>
                    <div className="creatingNewGroupPlace">
                        <div className="flex-container">
                            <div className="flex-block-9" style={{ textAlign: 'center' }}>
                                <input type="text" autoFocus className="myInput" placeholder="New Group" onChange={changeGroupName} value={newGroupName}></input>
                            </div>
                            <div className="flex-block-1" style={{ textAlign: 'center' }}>
                                <button className='mybutton' onClick={saveNewGroup}>
                                    <i className="material-icons">check</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }   
    }

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
                                <button className='mybutton' onClick={visibleToggle}>
                                    <i className="material-icons">add_box</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>                    
                    {
                        userGroups.map(function (row, i) {
                            return (
                                <GroupsListRowComponent key={i} row={row} index={i} onUserPlacePageChange={onUserPlacePageChange} groupWordsChange={groupWordsChange} />
                            )
                        })
                    }
                    {creatingNewGroup()}
                </div>
            </div>
        )
    } else if (userGroups == null) {
        return (
            <div className="spinner"></div>
        )
    }
}