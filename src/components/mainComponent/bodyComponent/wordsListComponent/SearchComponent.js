import React, { Component } from "react";
import SearchRowComponent from './SearchRowComponent'
import { getAllWords, addNewWord, addWordToGroup } from "../../../../services/requests";

export default class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { allWords: [], temp: [], search: '', newEng: '', newRus: '' }

        this.changeEng = this.changeEng.bind(this);
        this.changeRus = this.changeRus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.search = this.search.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    componentDidMount() {
        getAllWords((data) => {
            this.setState({ allWords: data, temp: data });
        })
    }
    search(e) {
        if (e.target.value) {
            let newList = this.state.allWords.filter((row) => {
                return row.eng.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
            });
            console.log(newList);
            this.setState({ temp: newList, search: e.target.value });
        }
        else {
            this.setState({ temp: this.state.allWords, search: '' });
        }
    }
    changeEng(e) {
        let newEng = e.target.value;
        this.setState({ newEng: newEng });
    }
    changeRus(e) {
        let newRus = e.target.value;
        this.setState({ newRus: newRus });
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.state.newEng != '' && this.state.newRus != '') {
            addNewWord(this.props.groupID, this.state.newEng, this.state.newRus, (data) => {
                this.props.updateWordsList(data);
                getAllWords((data) => {
                    this.setState({ allWords: data, temp: data, search: '', newEng: '', newRus: '' });
                });
            });
        } else {
            alert('поля пустые');
        }
    }
    onSave(row) {
        console.log(row.id);
        addWordToGroup(this.props.groupID, row.id, (data) => {
            console.log(data);
            this.props.updateWordsList(data);
            this.setState({ search: '', newEng: '', newRus: '' });
        });
    }

    render() {
        return (

            <div className={`addForm ${this.props.className}`}>
                <div className='container'>
                    <div className="flex-container">
                        <div className="flex-block-3">
                            <input type="text" className="myInput" placeholder='Search' onChange={this.search} value={this.state.search}></input>
                        </div>
                    </div>
                    {
                        this.state.temp.map(function (row, i) {
                            return (
                                <SearchRowComponent key={i} row={row} onSave={this.onSave}></SearchRowComponent>
                            )
                        }.bind(this))
                    }
                    <form onSubmit={this.onSubmit}>
                        <div className='flex-container'>
                            <div className='flex-block-3'>
                                <input className='myInput' placeholder='english' onChange={this.changeEng} value={this.state.newEng}></input>
                            </div>
                            <div className='flex-block-3'>
                                <input className='myInput' placeholder='russian' onChange={this.changeRus} value={this.state.newRus}></input>
                            </div>
                            <div className='flex-block-2'>
                                <button className='mybutton' type='submit'>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

