import React, { useState, useEffect } from 'react';
import List from './List';

import axios from 'axios';

const url = process.env.REACT_APP_URL_DATABASE;

function Container() {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get(url).then((resolve) => { setData(resolve.data) });
	}, []);

	// data - массив item`ов
	return (
		<div className="container">

			<div className="container__addTask">
				<div className="container__title">Task</div>
				<input className="container__item container__input" placeholder="Task ..." />
				<button className="container__item container__button" onClick={(e) => { addItem(e, setData, data) }}>ADD</button>
			</div>
			<List data={data} />
		</div >
	)
}

function addItem(e, f, data) { // изменяем стейт хука data с помощью setData;
	// добавляем в данные на сервере новый item 
	let obj = {};
	obj.id = data.length + 1;
	obj.done = "false";
	obj.text = document.querySelector('.container__input').value;

	console.log(data);
	f([...data, obj]);

	axios.post(url, {
		"id": obj.id,
		"done": "false",
		"text": obj.text
	})
}


export default Container;


