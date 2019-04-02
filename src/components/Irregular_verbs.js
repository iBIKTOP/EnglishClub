import React, { Component } from "react";
import Nav from "./Nav"
import { getIrregularVerbs } from "../services/requests"
import IrregularRow from "./IrregularRow.js"

class Irregular_verbs extends Component {
    constructor(props) {
        super(props);
        this.state = { irregular_verbs: null };
    }

    componentDidMount() {
        getIrregularVerbs((irregular_verbs) => {
            this.setState({ irregular_verbs: irregular_verbs })
        });
    }

    render() {
        if (this.state.irregular_verbs != null) {
            return (
                <div>
                    <Nav />
                    <div className="container">
                        <h1>Irregular_verbs</h1>
                        <table class="table table-striped">
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

                            </tbody>
                        </table>
                        {//выводим список
                            this.state.irregular_verbs.map(function (row, i) {
                                return (
                                    <IrregularRow key={i} row={row} i={i} />
                                )
                            })
                        }

                    </div>
                </div>
            )
        } else {
            return (
                <p>не подгрузилось</p>
            )
        }

    }
}

export default Irregular_verbs;