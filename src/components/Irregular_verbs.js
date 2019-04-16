import React, { Component } from "react";
import Nav from "./Nav"
import { getIrregularVerbs } from "../services/requests"
import IrregularRow from "./IrregularRow.js"
import { getCookie, deleteCookie } from '../services/cookie';

class Irregular_verbs extends Component {
    constructor(props) {
        super(props);
        this.state = { irregular_verbs: null, id: '' };
    }

    componentDidMount() {
        getCookie('ID',
            //если Cookie хранит ID пользователя то сохраняем его в state,
            //если Cookie не сущестует, то устанавливаем пустое значение
            (id) => {
                this.setState({ id: id });
            },
            //если Cookie хранит ID пользователя то запускаем функцию получения групп пользователя
            (id) => {
                getIrregularVerbs(id, (irregular_verbs) => {
                    this.setState({ irregular_verbs: irregular_verbs });
                });
            });
    }

    render() {
        if (this.state.irregular_verbs != null) {
            return (
                <div>
                    <Nav />
                    <div className="container">
                        <h1>IRREGULAR VERBS</h1>
                        <h6>(Учим неправельные глаголы)</h6>
                        <div className='row'>
                            <div className='col-2 font-weight-bold'>Infinitive</div>
                            <div className='col-2 font-weight-bold'>Past Tense</div>
                            <div className='col-2 font-weight-bold'>Past Participle</div>
                            <div className='col-2 font-weight-bold'>Translate</div>
                            <div className='col-2 font-weight-bold'>1</div>
                            <div className='col-2 font-weight-bold'>2</div>
                        </div>
                        <hr></hr>
                        {//выводим список
                            this.state.irregular_verbs.map(function (row, i) {
                                return (
                                    <IrregularRow key={i} row={row} i={i} />
                                )
                            })
                        }
                        {/* <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Infinitive</th>
                                    <th scope="col">T1</th>
                                    <th scope="col">Past Tense</th>
                                    <th scope="col">T2</th>
                                    <th scope="col">Past Participle</th>
                                    <th scope="col">T3</th>
                                    <th scope="col">Translate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {//выводим список
                                    this.state.irregular_verbs.map(function (row, i) {
                                        return (
                                            <IrregularRow key={i} row={row} i={i} />
                                        )
                                    })
                                }
                            </tbody>
                        </table> */}
                    </div>
                </div>
            )
        } else {
            return (
                <p>Подождите, подгружаем данные.</p>
            )
        }

    }
}

export default Irregular_verbs;