import React, { Component } from "react";

import { getUser, getIrregularVerbs } from "../../../../services/requests"
import IrregularRow from "./IrregularRow"
import { getCookie, deleteCookie } from '../../../../services/cookie';
import Irregular_verbs_study from './Irregular_verbs_study'

export default class Irregular_verbs extends Component {
    constructor(props) {
        super(props);
        this.state = { irregular_verbs: null, id: '', login: '' };
    }

    componentDidMount() {
        getIrregularVerbs(this.props.userID, (irregular_verbs) => {
            this.setState({ irregular_verbs: irregular_verbs });
        });
    }

    render() {
        if (this.state.irregular_verbs != null && this.state.irregular_verbs.length != 0) {
            return (
                <div>
                    <h1>IRREGULAR VERBS</h1>
                    <h6>(Учим неправильные глаголы)</h6>
                    <div className='flex-container htable'>
                        <div className='flex-block-3' style={{fontWeight: "bold"}}>Infinitive</div>
                        <div className='flex-block-3' style={{fontWeight: "bold"}}>Past Tense</div>
                        <div className='flex-block-3' style={{fontWeight: "bold"}}>Past Participle</div>
                        <div className='flex-block-3' style={{fontWeight: "bold"}}>Translate</div>
                    </div>
                    {//выводим список
                        this.state.irregular_verbs.map(function (row, i) {
                            return (
                                <IrregularRow key={i} row={row} i={i} />
                            )
                        })
                    }
                    {/* {this.renderRedirect()} */}
                    {/* <Irregular_verbs_study /> */}
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