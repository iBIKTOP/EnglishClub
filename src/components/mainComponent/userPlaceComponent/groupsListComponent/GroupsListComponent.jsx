import React, { Component } from "react";

import ir from '../../../../img/iv.png';
import Irregular_verbs from "../irregularVerbsPage/Irregular_verbs"
import GroupsListRowComponent from "./GroupsListRowComponent";
import { getUserGroups, getNewGroup } from "../../../../services/requests"


export default function GroupsListComponent({ id, onUserPlacePageChange, groupWordsChange }) {
    const [userGroups, setUserGroups] = React.useState(null);
    React.useEffect(() => {
        if (userGroups == null) {
            (async () => {
                let groups = await getUserGroups(id);
                setUserGroups(groups);
            })();
        }
    });
    let onAddNewGroup = () => {
        onUserPlacePageChange('wordsList');
        groupWordsChange(null);
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
                                <button className='mybutton' onClick={onAddNewGroup}>
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
                </div>
            </div>
        )
    } else if (userGroups == null) {
        return (
            <div className="spinner"></div>
        )
    }
}