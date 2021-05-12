import React, { Component } from 'react';
import List from './List';

import axios from 'axios';


const url = "http://localhost:3000/record";

class Container extends Component {
	constructor() {
		super();

		this.state = {
			loaded: false,
			data: null,
		}
		this.addItem = addItem.bind(this);
	}

	async componentDidMount() {
		let data = await axios({
			method: 'get',
			url: url,
		});
		data = data.data;
		this.setState({
			loaded: true,
			data: data,
		})
	}


	render() {

		if (!this.state.loaded) {
			return (
				<div>
					NO
				</div>
			)
		}
		return (
			<div className="container">
				<div className="container__addTask">
					<div className="container__title">Task</div>

					<input className="container__item container__input" placeholder="Task ..." />
					<button className="container__item container__button" onClick={this.addItem}>ADD</button>

				</div>
				<List data={this.state.data} />
			</div >
		)
	}
}

function addItem(e) {
	let obj = {};
	obj.id = this.state.data.length + 1;
	obj.done = "false";
	obj.text = document.querySelector('.container__input').value;

	let data = this.state.data;
	data.push(obj);

	axios.post(url, {
		"id": obj.id,
		"done": "false",
		"text": obj.text
	})

	this.setState({
		data: data,
	});
}


export default Container;

