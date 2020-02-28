import React from "react";
import TranslateComponentRow from './TranslateComponentRow'

export default function TranslateComponent({ data, newRus, onSetNewRus }) {
	let str = newRus;
	let arr = [];
	if(str == '') arr = [];
	if(str != '' && str.indexOf(', ') == -1) arr[0] = str;
	if(str != '' && str.indexOf(', ') != -1) {
		arr = str.split(', ');
	}
	let changeArr = (row) => {
		let finalStr = '';
		let index = arr.indexOf(row);
		if(index == -1) arr.push(row);
		if(index != -1) arr.splice(index, 1);
		
		if(arr.length == 0) finalStr = '';
		if(arr.length == 1) finalStr = arr[0];
		if(arr.length > 1) {
			finalStr = arr[0];
			for(let i=1; i<arr.length; i++){
				finalStr = `${finalStr}, ${arr[i]}`
			}
		}
		onSetNewRus(finalStr);
	}
	return(
		<div>
			<hr />
			<h5 align="center"><b>{data.phrase}</b>{data.transcription}</h5>
			<hr />
			{data.translate.map(function (row, i) {
				return (
					<TranslateComponentRow row={row} key={i} changeArr={changeArr}/>
				)
			})}
		</div>
	)
}