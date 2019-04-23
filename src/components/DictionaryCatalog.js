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
                                <DictionaryRow key={i} row={row} index={i} />
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