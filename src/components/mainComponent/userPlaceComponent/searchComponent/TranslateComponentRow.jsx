import React from "react";

export default function TranslateComponentRow({ row, changeArr }) {

	let onChangeArr = () => {
		changeArr(row);
	}
	return (
		<div onClick={onChangeArr} className='rowPlace'>
			<div className='rowItem' style={{ textAlign: 'center' }}>{row}</div>
		</div>
	)
}