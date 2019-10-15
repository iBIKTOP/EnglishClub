import React, { Component } from "react";

import HeaderComponent from "./headerComponent/HeaderComponent";
import { getCookie, setCookie, deleteCookie } from '../../services/cookie';
import '../../styles/App.css';
import RegistrationComponent from "./bodyComponent/registrationComponent/RegistrationComponent";
import LoginComponent from "./bodyComponent/loginComponent/LoginComponent";
import { getUser, getUserGroups, getWordsList, getIrregularVerbs } from "../../services/requests"
import WelcomeComponent from "./bodyComponent/welcomeComponent/WelcomeComponent";
import UserPlaceComponent from "./bodyComponent/UserPlaceComponent";


export default function MainComponent(props) {
    const [user, setUser] = React.useState(null);
    const [page, setPage] = React.useState('welcome');

    React.useEffect(() => {
        console.log(page);
        if (user == null) {
            getCookie('ID')
                .then((cookieId) => {
                    if(cookieId != '') {
                        getUser(cookieId)
                            .then((user) => {
                                setUser(user);
                                setPage('userPlace');
                            })
                    }
                })
        }
    });

    let setWelcomePage = (page) => setPage(page);
    let onUserChange = (user) => setUser(user);
    let onLogOut = () => {
        deleteCookie();
        setUser(null);
        setPage('welcome');
    }
    let renderBody = () => {
        if (user == null) {
            switch (page) {
                case 'welcome':
                    return (<WelcomeComponent />)
                case 'signIn':
                    return (<LoginComponent onUserChange={onUserChange} setWelcomePage={setWelcomePage} />)
                case 'signUp':
                    return (<RegistrationComponent onUserChange={onUserChange} setWelcomePage={setWelcomePage} />)
            }
        } else {
            switch (page) {
                case 'userPlace':
                    return (<UserPlaceComponent />)
            }
            
            // switch (this.state.page) {
            //     case 1:
            //         return (
            //             <Irregular_verbs irregular_verbs={this.state.iv} />
            //         )
            //     case 2:
            //         if (this.state.group.wordsListName != '') {
            //             return (
            //                 <div className='mycard'>
            //                     <BodyComponent wordsList={this.state.wordsList} group={this.state.group} updateWordsList={this.updateWordsList} />
            //                 </div>
            //             );
            //         } else {
            //             return (
            //                 <div>Статистика</div>
            //             )
            //         }
            // }
        }
    }
    return (
        <div>
            <HeaderComponent user={user} setWelcomePage={setWelcomePage} onLogOut={onLogOut} />
            {renderBody()}
        </div>
    )
}
// export default class MainComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { user: '', 
//                         group: '', 
//                         userGroups: '', 
//                         wordsList: '', 
//                         wordsListName: '', 
//                         iv: '', 
//                         page: 1, 
//                         welcome: 'welcome' };

//         this.onLogOut = this.onLogOut.bind(this);
//         this.onUserChange = this.onUserChange.bind(this);
//         this.setWordsList = this.setWordsList.bind(this);
//         this.updateWordsList = this.updateWordsList.bind(this);
//         this.setIV = this.setIV.bind(this);
//         this.setWelcomePage = this.setWelcomePage.bind(this);
//     }
//     componentDidMount() { //нужно добавить проверку на вымышленного пользователя.
//         getCookie('ID', (id) => {
//             setCookie(id);
//             this.setUserData(id);
//         });
//     }
//     setUserData(id) {
//         getUser(id, (user) => {
//             getUserGroups(user.id, ({ userGroups }) => {
//                 getIrregularVerbs(user.id, (iv) => {
//                     this.setState({ user: user, userGroups: userGroups, iv: iv });
//                 });
//             });
//         });
//     }
//     onLogOut() {
//         deleteCookie();
//         this.setState({ user: '' });
//     }
//     onUserChange(user) {
//         this.setUserData(user.id);
//     }
//     setWordsList(group) {
//         getWordsList(group.id, (data) => {
//             this.setState({ wordsList: data, group: group, page: 2 });
//         });
//     }
//     updateWordsList(wordsList) {
//         this.setState({ wordsList: wordsList });
//     }
//     setIV() {
//         this.setState({ page: 1 });
//     }
//     setWelcomePage(data) {
//         this.setState({ welcome: data })
//     }
//     renderBody() {
//         if (this.state.user == '') {
//             switch (this.state.welcome) {
//                 case 'welcome':
//                     return (
//                         <div>
//                             <WelcomeComponent />
//                         </div>
//                     )
//                     break;
//                 case 'signIn':
//                     return (
//                         <div>
//                             <LoginComponent onUserChange={this.onUserChange} />
//                         </div>
//                     )
//                     break;
//                 case 'signUp':
//                     return (
//                         <div>
//                             <RegistrationComponent onUserIDChange={this.onUserIDChange} />
//                         </div>
//                     )
//                     break;
//             }
//         } else {
//             switch (this.state.page) {
//                 case 1:
//                     return (
//                         <Irregular_verbs irregular_verbs={this.state.iv} />
//                     )
//                 case 2:
//                     if (this.state.group.wordsListName != '') {
//                         return (
//                             <div className='mycard'>
//                                 <BodyComponent wordsList={this.state.wordsList} group={this.state.group} updateWordsList={this.updateWordsList} />
//                             </div>
//                         );
//                     } else {
//                         return (
//                             <div>Статистика</div>
//                         )
//                     }
//             }
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <HeaderComponent
//                     user={this.state.user}
//                     userGroups={this.state.userGroups}
//                     onLogOut={this.onLogOut}
//                     setWordsList={this.setWordsList}
//                     setIV={this.setIV}
//                     setWelcomePage={this.setWelcomePage} />
//                 <div className='container'>
//                     {this.renderBody()}
//                 </div>
//             </div>
//         )
//     }
// }