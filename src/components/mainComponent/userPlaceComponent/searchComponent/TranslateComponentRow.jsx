import React from "react";

export default function TranslateComponentRow({ row, changeArr }) {

	let onChangeArr = () => {
		changeArr(row);
	}
	return(
		<div onClick={onChangeArr} className='groupsRow'>
			<div className='groupsRowItem' style={{ textAlign: 'center' }}>{row}</div>
		</div>
	)
}