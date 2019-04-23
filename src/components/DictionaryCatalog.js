import React, { Component } from "react";
import DictionaryRow from "./DictionaryRow";

class DictionaryCatalog extends Component {
    render() {
        if (this.props.catalog.length != 0) {
            return (
                <ul className="list-group">
                    {//выводим список
                        this.props.catalog.map(function (row, i) {
                            return (
                                <div>
                                    <h1 className="text-center">Список твоих групп</h1>
                                    <DictionaryRow key={i} row={row} index={i} />
                                </div>
                            )
                        })
                    }
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