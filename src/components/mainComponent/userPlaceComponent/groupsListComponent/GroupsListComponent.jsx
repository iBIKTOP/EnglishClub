import React from "react";

import Irregular_verbs from "../irregularVerbsPage/Irregular_verbs";
import GroupsListRowComponent from "./GroupsListRowComponent";
import { getUserGroups, getNewGroup, addNewGroup, startLearning } from "../../../../services/requests";
import newMessage from "../../../../services/newMessage";
import LearningComponent from "./LearningComponent";

export default function GroupsListComponent({ id, onUserPlacePageChange, groupWordsChange, onLogOut }) {
    const [userGroups, setUserGroups] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const [newGroupName, setNewGroupName] = React.useState('');
    const [page, setPage] = React.useState('groupList');
    const [learningArr, setLearningArr] = React.useState([]);
    let arr = [];

    React.useEffect(() => {
        if (userGroups == null) {
            (async () => {
                let groups = await getUserGroups(id);
                setUserGroups(groups);
            })();
        }
    });
    let editArr = (groupID) => {
        let temp = 1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == groupID) {
                // let arr2 = arr;
                // setArr(arr2.splice(i, 1));
                arr.splice(i, 1)
                temp = 0;
            }
        }
        if (temp == 1) {
            // let arr2 = arr;
            // setArr(arr2.push(groupID));
            arr.push(groupID)
        }
    }
    let saveNewGroup = async () => {
        let newGroup = await addNewGroup(id, newGroupName);
        groupWordsChange(newGroup);
        onUserPlacePageChange('wordsList');
    }
    let changeGroupName = (e) => setNewGroupName(e.target.value);
    let visibleToggle = () => visible ? setVisible(false) : setVisible(true);
    let creatingNewGroup = () => {
        if (visible) {
            return (
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
    let startLesson = () => {
        if (arr.length == 0) {
            newMessage("Необходимо выбрать хотя бы один урок");
        } else if (arr.length > 0) {
            setPage("learning");
            setLearningArr(arr);
        }
    }
    let onSetPage = (page) => {
        setPage(page);
    }

    switch (page) {
        case "groupList":
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
                                            <i className="material-icons" onClick={startLesson}>done_outline</i>
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
                                    if (row.checked == 1) {
                                        // let arr2 = arr;
                                        // setArr(arr2.push(row.id));
                                        arr.push(row.id)
                                    }
                                    return (
                                        <GroupsListRowComponent key={i} row={row} index={i} onUserPlacePageChange={onUserPlacePageChange} groupWordsChange={groupWordsChange} editArr={editArr} />
                                    )
                                })
                            }
                            {creatingNewGroup()}
                        </div>
                    </div>
                )
            }
            if (userGroups == null) {
                return (
                    <div className="spinner"></div>
                )
            }
        case "learning":
            return (
                <LearningComponent learningArr={learningArr} onSetPage={onSetPage} />
            )
    }

}