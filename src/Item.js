import React from 'react';

import axios from 'axios';

const url = process.env.REACT_APP_URL_DATABASE;
// const url = "http://localhost:3000/record";

function Item(props) {
	return (
		<div className="item">
			<div className="item__elem check">
				<label htmlFor="check__input" className={(props.check == "true" ? "check__label" : "check__label check__label--true")} onClick={updateDataOnClickCheck}></label>
				<input type="checkbox" id="check__input" className="check__input" />
			</div>
			<div className="item__elem text">
				<input type="text" className="text__input" defaultValue={props.text} onChange={UpdateDataOnChangeInput} />
			</div>
			<div className="item__elem delete">
				<label htmlFor="delete__input" className="delete__label" onClick={deleteData}></label>
				<input type="checkbox" className="delete__input" id="delete__input" />
			</div>

		</div >
	)
}

// Обновление при вводе значений в input`ы тасков 
async function UpdateDataOnChangeInput(e) {
	let elemDatebase = await getCurrentElemInDatebase(e);

	const response = await axios.put(url + '/' + elemDatebase.id, {
		"id": elemDatebase.id,
		"done": (elemDatebase.done == "true" ? "false" : "true"),
		"text": e.target.value
	});
}


// Функции редактирования базы данных по клику на checkbox`ы
async function updateDataOnClickCheck(e) {

	let elemDatebase = await getCurrentElemInDatebase(e);

	const response = await axios.put(url + '/' + elemDatebase.id, {
		"id": elemDatebase.id,
		"done": (elemDatebase.done == "true" ? "false" : "true"),
		"text": elemDatebase.text
	});
	clickCheck(e);
}

async function deleteData(e) {
	let id = await getCurrentElemInDatebase(e);
	id = id.id;

	const response = await axios.delete(url + '/' + id);

	clickDelete(e);
}

// Вспомогающие функции
function clickCheck(e) {
	e.target.classList.toggle("check__label--true");
}
function clickDelete(e) {
	e.target.closest('.item').remove();
}

async function getCurrentElemInDatebase(e) {
	let elems = document.querySelectorAll('.item');
	let number;

	for (let i = 0; i < elems.length; i++) {
		if (e.target.closest('.item') == elems[i]) {
			number = i;
			break;
		}
	}

	let data = await axios.get(url);
	data = data.data[number];
	return data;
}

export default Item;
