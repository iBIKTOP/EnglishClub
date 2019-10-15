import React, { Component } from "react";

import '../../../styles/App.css';
import GroupsListComponents from "./groupsListComponent/GroupsListComponent"
import WordsListComponent from "./wordsListComponent/WordsListComponent";
import SearchComponent from "./wordsListComponent/SearchComponent";
import { userInfo } from "os";

export default function UserPlaceComponent({ id }) {
    const [userPlacePage, setUserPlacePage] = React.useState('userGgroups');
    let onuserPlacePageChange = (page) => { setUserPlacePage(page) };
    switch (userPlacePage) {
        case 'userGgroups':
            return (<GroupsListComponents id={id} onuserPlacePageChange={onuserPlacePageChange} />)
        case 'wordsList':
            return (<p>wordsList</p>)
        // case 'signUp':
        //     return (<RegistrationComponent onUserChange={onUserChange} setWelcomePage={setWelcomePage} />)
    }
}

// export default class BodyComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { page: 'wordList' };

//         this.onToggleAddForm = this.onToggleAddForm.bind(this);
//     }
//     onToggleAddForm() {
//         let page = this.state.page === 'wordList' ? 'addForm' : 'wordList';
//         this.setState({ page: page });
//     }
//     renderContent() {
//         switch (this.state.page) {
//             case 'wordList':
//                 return (
//                     <WordsListComponent groupID={this.props.group.id} wordsList={this.props.wordsList} updateWordsList={this.props.updateWordsList} />
//                 );
//                 break;
//             case 'addForm':
//                 return (
//                     <SearchComponent groupID={this.props.group.id} updateWordsList={this.props.updateWordsList} onToggleAddForm={this.onToggleAddForm} />
//                 );
//                 break;
//         }
//     }
//     render() {
//         if (this.props.group.group_name != '') {
//             return (
//                 <div>
//                     <div className='mycard-header'>
//                         <div className='flex-container'>
//                             <div className='flex-block-3'>
//                                 {this.props.group.group_name}
//                             </div>
//                             <div className='flex-block-3' style={{ textAlign: 'right' }}>
//                                 <button className='mybutton' onClick={this.onToggleAddForm}>ADD</button>
//                             </div>
//                         </div>


//                     </div>
//                     {this.renderContent()}
//                 </div>
//             );
//         } else {
//             return (
//                 <p>Странно, нет имени группы?</p>
//             )
//         }
//     }
// }