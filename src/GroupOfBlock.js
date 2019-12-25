import React from 'react';
import Block from './Block.js';
import './GroupOfBlock.css';

const GroupOfBlocks =({obiekty})=>{
	console.log(obiekty.features);
	let arrayObjects = obiekty.features;
	return (
		<div id="boxGroup" className='fl w-50 pa2 vh-100'> 
			{//https://tachyons.io/docs/layout/grid/
				arrayObjects.map((item, i)=>{
					return (
						<Block 
							key={i}
							id={item.properties.id}
							name={item.properties.description.name}
							specification={item.properties.description.specification}
						/>
						//<div>{item.properties.id}</div>
						)

				}) 
			}
		</div>
		);
}

export default GroupOfBlocks;