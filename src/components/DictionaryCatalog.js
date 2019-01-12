import React, { Component } from "react";
import DictionaryRow from "./DictionaryRow";

class DictionaryCatalog extends Component {
    render() {
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
    }
}

export default DictionaryCatalog;