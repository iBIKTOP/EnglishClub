import React from "react";
import TranslateComponentRow from './TranslateComponentRow'

export default function TranslateComponent({ data }) {


	return(
		<div>
			<hr />
			<h5 align="center"><b>{data.phrase}</b>{data.transcription}</h5>
			<hr />
			{data.translate.map(function (row, i) {
				console.log(row);
				return (
					<TranslateComponentRow row={row} key={i}/>
				)
			})}
		</div>
	)
}