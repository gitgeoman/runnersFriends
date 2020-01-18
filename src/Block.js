import React from 'react';


const Block = ({id, name, specification, onclick, onOut}) =>{
	return(
		<div id={id} onMouseOver={onclick} onMouseOut={onOut} className='f4 bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
				<div className='fw7 tc ' >{name}
				</div> <br/>
				{specification}
		</div>
		);
}

export default Block;