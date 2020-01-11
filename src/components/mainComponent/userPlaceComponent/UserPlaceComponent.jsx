import React from "react";
import '../../../styles/App.css';
import GroupsListComponents from "./groupsListComponent/GroupsListComponent"
import WordsListComponent from "./wordsListComponent/WordsListComponent";
import SearchComponent from "./searchComponent/SearchComponent";

export default function UserPlaceComponent({ userID, onLogOut }) {
    const [userPlacePage, setUserPlacePage] = React.useState('userGroups');
    const [group, setGroup] = React.useState(null);

    let onUserPlacePageChange = (page) => setUserPlacePage(page);
    let groupWordsChange = (group) => setGroup(group);

    switch (userPlacePage) {
        case 'userGroups':
            return (
                <div>
                    <GroupsListComponents id={userID} onUserPlacePageChange={onUserPlacePageChange} groupWordsChange={groupWordsChange} onLogOut={onLogOut}/>
                </div>
            )
        case 'wordsList':
            return (
                <div>
                    <WordsListComponent userID={userID} group={group} onUserPlacePageChange={onUserPlacePageChange} groupWordsChange={groupWordsChange} />
                </div>
            )
        case 'search':
            return (
                <div>
                    <SearchComponent group={group} onUserPlacePageChange={onUserPlacePageChange} />
                </div>
            )
    }
}