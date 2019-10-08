import React from 'react';
import GroupsListRowComponent from "./GroupsListComponent/GroupsListRowComponent";
import { getUser } from "../../../services/requests"

export default function HeaderComponent({user, setWelcomePage}){
    React.useEffect(() => {
              
    });

    let onSignInClick = () => setWelcomePage('signIn');
    
    let renderUser = () => {
            console.log('Пользователь: ', user);
            if (user != null) {
                return (
                    <button className='mybutton'><i>exit_to_app</i></button>
                )
            }
            else {
                return (
                    <div className="flex-container">
                        <div className="flex-block-3" style={{ textAlign: 'right' }}>
                            <button className='mybutton' onClick={onSignInClick}>Sign In</button>
                            <button className='mybutton'>Sign Up</button>
                        </div>
                    </div>
                )
            }
    }
    return (
        <div className="header">
            <div className="container">
                <div className="flex-container">
                    <div className="flex-block-3">
                        {/* <Link className="logoName" to="/">EngForYou</Link> */}
                        <div className='logo'>English For You</div>
                    </div>
                    <div className="flex-block-3" style={{ textAlign: 'right' }}>
                        {renderUser()}
                    </div>
                </div>
            </div>
        </div>
    )
}

// export default class HeaderComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { groupsClass: 'groups' }
//         this.toggleGroups = this.toggleGroups.bind(this);
//         this.setWordsList = this.setWordsList.bind(this);
//         this.onClickIV = this.onClickIV.bind(this);
//         this.onSignInClick = this.onSignInClick.bind(this);
//         this.onSignUpClick = this.onSignUpClick.bind(this);
//     }
//     toggleGroups() {
//         this.state.groupsClass == 'groups' ? this.setState({ groupsClass: 'groups visible' }) : this.setState({ groupsClass: 'groups' });
//     }
//     setWordsList(group) {
//         this.props.setWordsList(group);
//         this.toggleGroups();
//     }
//     onClickIV() {
//         this.props.setIV();
//         this.toggleGroups();
//     }
//     onSignInClick() {
//         this.props.setWelcomePage('signIn')
//     }
//     onSignUpClick() {
//         this.props.setWelcomePage('signUp')
//     }
//     renderUser() {
//         if (this.props.user != '') {
//             return (
//                 <div className="">
//                     {/* <div className="flex-block-3" style={{ textAlign: 'right' }}>
//                         {this.props.user.login}
//                     </div> */}

//                     {/* <div className="flex-block-3" style={{ textAlign: 'right' }}> */}
//                     {/* {this.props.user.login} */}
//                     <button className='mybutton'><i className="material-icons" onClick={this.toggleGroups}>view_list</i></button>
//                     <button className='mybutton'><i className="material-icons" onClick={this.props.onLogOut}>exit_to_app</i></button>
//                     {/* </div> */}
//                     {/* <button className="btn btn-outline-light ml-2" onClick={this.props.onLogOut}>Выход</button> */}
//                 </div>
//             )
//         }
//         else {
//             return (
//                 <div className="flex-container">
//                     <div className="flex-block-3" style={{ textAlign: 'right' }}>
//                         <button className='mybutton' onClick={this.onSignInClick}>Sign In</button>
//                         <button className='mybutton' onClick={this.onSignUpClick}>Sign Up</button>
//                     </div>
//                 </div>
//             )
//         }
//     }
//     renderIR() {
//         return (
//             <div className={this.state.groupsClass} onClick={this.onClickIV}>
//                 <div className="mycard-body">
//                     Irregular verbs
//                 </div>
//             </div>
//         )
//     }
//     renderGroupList() {
//         if (this.props.userGroups != '') {
//             return (
//                 <div>
//                     {//выводим список
//                         this.props.userGroups.map(function (row, i) {
//                             return (
//                                 <GroupsListRowComponent key={i} row={row} index={i} groupsClass={this.state.groupsClass} setWordsList={this.setWordsList} />
//                             )
//                         }.bind(this))
//                     }
//                 </div>
//             )
//         } else {
//             return (
//                 <span></span>
//             )
//         }
//     }
//     render() {
//         return (
//             <div className="header">
//                 <div className="container">
//                     {/* шапка */}
//                     <div className="flex-container">
//                         <div className="flex-block-3">
//                             {/* <Link className="logoName" to="/">EngForYou</Link> */}
//                             <div className='logo'>English For You</div>
//                         </div>
//                         <div className="flex-block-3" style={{ textAlign: 'right' }}>
//                             {this.renderUser()}
//                         </div>
//                     </div>
//                     {/* Группы */}
//                     <div className="">
//                         {this.renderIR()}
//                     </div>
//                     <div className="">
//                         {this.renderGroupList()}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }