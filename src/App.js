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
        obiekty: geojsonFeature.features,
        hoverID:'',
        toggle:false

    }
  }


/*do zrobienia jutro 
1. funckja ktora tworzy warstwe leaflet po najechaniu na obiekt i dodaje do klasy marker odpowiadajacy ID obiektu
  a) pulsujacy marker
  b) otwarty popup
2. funkcja ktora usuwa warstwe leaflet po zjechaniu z obiektu


*/

  onSearchField=(event)=>{
      this.setState({searchfield:event.target.value})

  };

  onMouseHover=(data)=>{
      this.setState({hoverID:(data.target.id)?data.target.id:''})
      this.setState({toggle:true});
      console.log(data.target.id)
  };
  onMouseHoverEnd=(data)=>{
    this.setState({toggle:false});
    console.log('false')
  };
  render(){
    const filteredData = this.state.obiekty.filter((obiekty)=>{
      return obiekty.properties.description.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    } 
    )
//   console.log(filteredData);
    return (
      <div >
        <div id='logo Nazwa'className='vh-25 f1 '>Funky name</div>
        <SearchBox searchChangeAtribute={this.onSearchField}/>
        <div className='dib w-100'>
          <GroupOfBlocks obiekty={filteredData} onClickEvent={this.onMouseHover} onOut={this.onMouseHoverEnd} />
          <LeafletMap obiekty={filteredData} toggle={this.state.toggle} hoverID={this.state.hoverID}/>
        </div>
      </div>
    )  
  }
} 

export default App;
