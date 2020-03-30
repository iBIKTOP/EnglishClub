import React from "react";

export default function GroupsListRowComponent({ row, onUserPlacePageChange, groupWordsChange, editArr, check }) {
    const [checked, setChecked] = React.useState(check);
    let getChecked = () => {
        return checked == false ? 'check_box_outline_blank' : 'check_box';
    }
    let onUpdateChecked = () => {
        if (checked == 0) {
            setChecked(true)
        } else {
            setChecked(false)
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