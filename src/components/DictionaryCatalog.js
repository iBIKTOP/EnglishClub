import React, { Component } from "react";
import DictionaryRow from "./DictionaryRow";
import { getUserGroups, getNewGroup, addNewGroup } from "../services/requests"

class DictionaryCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = { userGroups: null, newGroup: '' }

        this.newGroupChange = this.newGroupChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        getUserGroups(this.props.userID, ({ userGroups }) => {
            this.setState({ userGroups: userGroups });
        });
    }

    newGroupChange(e) {
        let newGroup = e.target.value;
        this.setState({ newGroup: newGroup });
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.state.newGroup != '') {
            addNewGroup(this.props.userID, this.state.newGroup, (data) => {
                this.setState({ userGroups: data, newGroup: '' })
            });
        } else {
            alert("Придумайте название новой группы");
        }
    }
    render() {
        if (this.state.userGroups != null) {
            return (
                <ul className="list-group">
                    <h1 className="text-center">Список твоих групп</h1>
                    {//выводим список
                        this.state.userGroups.map(function (row, i) {
                            return (
                                <DictionaryRow key={i} row={row} index={i} />
                            )
                        })
                    }
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" value={this.state.newGroup || ''} onChange={this.newGroupChange}></input>
                            <button type="submit" className="btn btn-outline-dark">Добавить</button>
                        </div>
                    </form>
                </ul>
            )
        } else {
            return (
                <p>Вы еще не создали ниодной группы</p>
            )
        }

    }
}

export default DictionaryCatalog;