import React from 'react';
import Item from './Item';


function List(props) {
	// console.log(props.data);
	let array = props.data;


	return (
		<div className="List">
			{array.map((elem, index) => (
				<Item key={index} text={elem.text} check={elem.done} />
			))}
		</div>
	)

}

export default List;

