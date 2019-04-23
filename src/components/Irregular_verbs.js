import React, { Component } from "react";
import Nav from "./Nav"
import { getUser, getIrregularVerbs } from "../services/requests"
import IrregularRow from "./IrregularRow.js"
import { getCookie, deleteCookie } from '../services/cookie';
import { Switch, Redirect } from "react-router-dom";

class Irregular_verbs extends Component {
    constructor(props) {
        super(props);
        this.state = { irregular_verbs: null, id: '', login: '' };

        this.onLogOut = this.onLogOut.bind(this);
    }

    componentDidMount() {
        getCookie('ID',
            (id) => {
                //если Cookie хранит ID пользователя то сохраняем его в state,
                //если Cookie не сущестует, то устанавливаем пустое значение
                this.setState({ id: id });
                //получаем данные о пользователе
                getUser(id, (login) => {
                    this.setState({ login: login });
                    console.log(this.state.login);
                });
                //если Cookie хранит ID пользователя то запускаем функцию получения групп пользователя
                getIrregularVerbs(id, (irregular_verbs) => {
                    this.setState({ irregular_verbs: irregular_verbs });
                });
            });
    }
    renderRedirect() {
        if (this.state.id == '') {
            return <Redirect to='/' />
        }
    }
    onLogOut() {
        deleteCookie();
        this.setState({ id: '', login: '' });
    }

    render() {
        if (this.state.irregular_verbs != null && this.state.irregular_verbs.length != 0) {
            return (
                <div>
                    <Nav user={this.state.login} onLogOut={this.onLogOut} />
                    <div className="container">
                        <h1>IRREGULAR VERBS</h1>
                        <h6>(Учим неправильные глаголы)</h6>
                        <div className='row align-items-center m-1 p-1 htable'>
                            <div className='col-3 font-weight-bold p-1'>Infinitive</div>
                            <div className='col-3 font-weight-bold p-1'>Past Tense</div>
                            <div className='col-3 font-weight-bold p-1'>Past Participle</div>
                            <div className='col-3 font-weight-bold p-1'>Translate</div>
                        </div>
                        {//выводим список
                            this.state.irregular_verbs.map(function (row, i) {
                                return (
                                    <IrregularRow key={i} row={row} i={i} />
                                )
                            })
                        }
                    </div>
                    {this.renderRedirect()}
                    <div className='modal_overlay'>
                        <div className='modal_body text-center'>
                            <div class="card text-center">
                                <div class="card-header">
                                    Как будет слово...
                            </div>
                                <div class="card-body">
                                    <p>Вторая форма глагола</p>
                                    <p>Третья форма глагола</p>
                                </div>
                                <div class="card-footer">
                                    <button className='btn btn-success'>Знаю</button>
                                    <button className='btn btn-warning'>Сомневаюсь</button>
                                    <button className='btn btn-danger'>Незнаю</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Подождите, подгружаем данные.</p>
                </div>

            )
        }

    }
}

export default Irregular_verbs;