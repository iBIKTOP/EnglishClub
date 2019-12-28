import React, { Component } from "react";
import SearchRowComponent from './SearchRowComponent'
import { getAllWords, addNewWord, addWordToGroup } from "../../../../services/requests";


export default function SearchComponent({group, onLogOut, clickBack}) {
    const[allWords, setAllWords] = React.useState(null);
    const[temp, setTemp] = React.useState(null);
    const[search, setSearch] = React.useState('');
    const[newEng, setNewEng] = React.useState('');
    const[newRus, setNewRus] = React.useState('');
    
    React.useEffect(() => {
        if(allWords == null){
            (async () => {
                let data = await getAllWords();
                console.log(data);
                setAllWords(data);
                setTemp(data);
            })();
        }
    });
    let searchWords = (e) => {
        changeEng(e);
        if (e.target.value) {
            let newList = allWords.filter((row) => {
                return row.eng.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
            });
            console.log(newList);
            setTemp(newList)
            // this.setState({ temp: newList, search: e.target.value });
        }
        else {
            setTemp(allWords);
        }
    }
    let renderContent = () => {
        if(temp != null){
            return(
                temp.map(function (row, i) {
                    return (
                        <SearchRowComponent key={i} row={row}></SearchRowComponent>
                    )
                })
            )
            
        }
    }
    let changeEng = (e) => setNewEng(e.target.value);
    let changeRus = (e) => setNewRus(e.target.value);
    let onSubmit = (e) => {
        e.preventDefault();
        if (newEng != '' && newRus != '') {
            let data = addNewWord(group.id, newEng, newRus, (data) => {
                this.props.updateWordsList(data);
                getAllWords((data) => {
                    this.setState({ allWords: data, temp: data, search: '', newEng: '', newRus: '' });
                });
            });
        } else {
            alert('поля пустые');
        }
    }
    return(
        <div>
            <div className="header">
                <div className="container">
                    <div className="flex-container">
                        <div className="flex-block-1" style={{ textAlign: 'left' }}>
                            <button className='mybutton' onClick={clickBack}>
                                <i className="material-icons">arrow_back</i>
                            </button>
                        </div>
                        <div className="flex-block-9" style={{ textAlign: 'right' }}>
                            <input type="text" className="myInput" placeholder="Search" onChange={searchWords}></input>
                        </div>
                        <div className="flex-block-1" style={{ textAlign: 'right' }}>
                            <button className='mybutton' onClick={onLogOut}>
                                <i className="material-icons">exit_to_app</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="flex-container">
                    <div className='flex-block-1'></div>
                    <div className='flex-block-9'>
                        <input className='myInput' placeholder='russian' onChange={changeRus} value={newRus}></input>
                    </div>
                    <div className='flex-block-1' style={{ textAlign: 'center' }}>
                        <button className='mybutton' type='submit' onClick={onSubmit}>Save</button>
                    </div>
                </div>
                {renderContent()}
            </div>
        </div>
    );
}

// export default class SearchComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { allWords: [], temp: [], search: '', newEng: '', newRus: '' }

//         this.changeEng = this.changeEng.bind(this);
//         this.changeRus = this.changeRus.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.search = this.search.bind(this);
//         this.onSave = this.onSave.bind(this);
//     }
//     componentDidMount() {
//         getAllWords((data) => {
//             this.setState({ allWords: data, temp: data });
//         })
//     }
//     search(e) {
//         if (e.target.value) {
//             let newList = this.state.allWords.filter((row) => {
//                 return row.eng.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
//             });
//             console.log(newList);
//             this.setState({ temp: newList, search: e.target.value });
//         }
//         else {
//             this.setState({ temp: this.state.allWords, search: '' });
//         }
//     }
//     changeEng(e) {
//         let newEng = e.target.value;
//         this.setState({ newEng: newEng });
//     }
//     changeRus(e) {
//         let newRus = e.target.value;
//         this.setState({ newRus: newRus });
//     }
//     onSubmit(e) {
//         e.preventDefault();
//         if (this.state.newEng != '' && this.state.newRus != '') {
//             addNewWord(this.props.groupID, this.state.newEng, this.state.newRus, (data) => {
//                 this.props.updateWordsList(data);
//                 getAllWords((data) => {
//                     this.setState({ allWords: data, temp: data, search: '', newEng: '', newRus: '' });
//                 });
//             });
//         } else {
//             alert('поля пустые');
//         }
//     }
//     onSave(row) {
//         console.log(row.id);
//         addWordToGroup(this.props.groupID, row.id, (data) => {
//             console.log(data);
//             this.props.updateWordsList(data);
//             this.props.onToggleAddForm();
//             this.setState({ search: '', newEng: '', newRus: '' });
//         });
//     }

//     render() {
//         return (

//             <div>
//                 <div className='container'>
//                     <div className='mycard-body'>
//                         <div className="flex-container">
//                             <div className="flex-block-3">
//                                 <input type="text" className="myInput" placeholder='Search' onChange={this.search} value={this.state.search}></input>
//                             </div>
//                         </div>
//                         {
//                             this.state.temp.map(function (row, i) {
//                                 return (
//                                     <SearchRowComponent key={i} row={row} onSave={this.onSave}></SearchRowComponent>
//                                 )
//                             }.bind(this))
//                         }
//                         <form onSubmit={this.onSubmit}>
//                             <div className='flex-container'>
//                                 <div className='flex-block-3'>
//                                     <input className='myInput' placeholder='english' onChange={this.changeEng} value={this.state.newEng}></input>
//                                 </div>
//                                 <div className='flex-block-3'>
//                                     <input className='myInput' placeholder='russian' onChange={this.changeRus} value={this.state.newRus}></input>
//                                 </div>
//                                 <div className='flex-block-2'>
//                                     <button className='mybutton' type='submit'>Save</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>

//                 </div>
//             </div>
//         )
//     }
// }

