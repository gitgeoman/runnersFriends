import React from 'react';

const SearchBox =({searchfield,searchChangeAtribute})=>{
	return (
		<div>
			<input 
				className='pa3 ba b--green bg-lightest-blue'
				type='search'
				placeholder='search users by name'
				onChange={searchChangeAtribute}
			/>
		</div>
	);
}

export default SearchBox;