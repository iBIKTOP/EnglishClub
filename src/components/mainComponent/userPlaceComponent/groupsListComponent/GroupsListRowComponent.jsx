import React from "react";
import { updateChecked } from "../../../../services/requests"

export default function GroupsListRowComponent({ row, onUserPlacePageChange, groupWordsChange, editArr }) {
    const [checked, setChecked] = React.useState(row.checked);
    let getChecked = () => {
        return checked == 0 ? 'check_box_outline_blank' : 'check_box'
    }
    let onUpdateChecked = () => {
        if (checked == 0) {
            setChecked(1)
            updateChecked(row.id, 1);
        } else {
            setChecked(0)
            updateChecked(row.id, 0);
        }
        editArr(row.id);
    }
    return (
        <div className="rowPlace">
            <div className="flex-container">
                <div className="flex-block-1 rowItem" style={{ textAlign: 'left' }} onClick={onUpdateChecked}>
                    <i className="material-icons icons">{getChecked()}</i>
                </div>
                <div className="flex-block-9 rowItem" style={{ textAlign: 'left' }} onClick={() => { onUserPlacePageChange('wordsList'); groupWordsChange(row); }}>
                    {row.group_name}
                </div>
            </div>
        </div>
    )
}