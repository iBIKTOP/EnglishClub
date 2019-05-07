import React, { Component } from "react";

export default class Irregular_verbs_study extends Component {
    render() {
        return (
            <div>
                <div className='modal_overlay'>
                    <div className='modal_body text-center'>
                        <div className="text-center p-0">
                            <div className="p-2">
                                <div className="htable m-1 p-1 mb-3">Cлово на русском</div>
                                I
                                <div className="irregular_row m-1 mt-3 mb-3 p-1">Первая форма глагола</div>
                                II
                                <div className="irregular_row m-1 mt-3 mb-3 p-1">Вторая форма глагола</div>
                                III
                                <div className="irregular_row m-1 mt-3 mb-3 p-1">Третья форма глагола</div>
                                <button className='btn btn-success mt-3 mb-3'>Знаю</button>
                                <button className='btn btn-warning mt-3 mb-3'>Сомневаюсь</button>
                                <button className='btn btn-danger mt-3 mb-3'>Незнаю</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}