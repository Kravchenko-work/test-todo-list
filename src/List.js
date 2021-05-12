import React, { Component } from 'react';
import Item from './Item';


class List extends Component {
	constructor() {
		super();
	}



	render() {

		let array = this.props.data;
		return (
			<div className="List">
				{array.map((elem, index) => (
					<Item key={index} text={elem.text} check={elem.done} />
				))}
			</div>
		)
	}
}

export default List;

