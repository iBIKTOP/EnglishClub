import React from "react";

export default function TranslateComponentRow({ row, changeArr }) {

	let onChangeArr = () => {
		changeArr(row);
	}
	return(
		<h6 onClick={onChangeArr}>{row}</h6>
	)
}