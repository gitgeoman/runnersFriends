import React, {Component} from 'react'
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
//import './LeafletMap.css'


export class LeafletMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 52.225,
      lng: 21.00,
      zoom: 13,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map className='vh-75 fl w-50' center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      </Map>
    );
  }
}

export default LeafletMap;