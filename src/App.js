import React, {Component} from 'react';

//my imports
import GroupOfBlocks from './GroupOfBlock.js';
//data import
import {geojsonFeature} from './data/dane.js';

import LeafletMap from './LeafletMap';
import 'tachyons';
import SearchBox from './SearchBox';

class App extends Component{
  constructor(){
    super()
    this.state={
        searchfield:'',
        obiekty: geojsonFeature.features
    }
  }

  onSearchField=(event)=>{
      
      this.setState({searchfield:event.target.value})

  };

  render(){

    const filteredData = this.state.obiekty.filter((obiekty)=>{
      return obiekty.properties.description.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    }
 
    )
   console.log(filteredData);
    return (
      <div >
        
        <div id='logo Nazwa'className='vh-25'></div>
        <SearchBox 
            searchChangeAtribute={this.onSearchField}
        />
        
        <div className='dib w-100'>
          <GroupOfBlocks 
            obiekty={filteredData} 
        />
          <LeafletMap 
            obiekty={filteredData}
          />
        </div>
      </div>
    )  
  }
} 



export default App;
