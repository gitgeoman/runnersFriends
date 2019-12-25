import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

//my imports
import GroupOfBlocks from './GroupOfBlock.js';
import {geojsonFeature} from './dane.js';

import LeafletMap from './LeafletMap';

ReactDOM.render(
	<div>
		<div className='vh-25'></div>
		<div className='dib'>
			<GroupOfBlocks obiekty={geojsonFeature} />
			<LeafletMap />
		</div>
	</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
