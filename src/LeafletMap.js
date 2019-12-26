import React, {Component} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {myRun} from './data/runningData.js';
import {myRunPoints} from './data/runningDataPoints';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });
        L.Marker.prototype.options.icon = DefaultIcon;


class LeafletMap extends Component {
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [52.33851,21.250407],
      zoom: 12,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
    
    //obiekt geojson przepisany do zmiennej
    let aaa= this.props.obiekty; // tak odwołuję się do obiektu który jest wysłany przez rodzica
      console.log(this.props.obiekty);

    this.layerMarkers=L.geoJSON(aaa , {
        pointToLayer: function (feature, latlng) 
          {//wstawia marker w postaci okręgu
            return L.circleMarker(latlng, 
            ).bindPopup(feature.properties.description.name);
            }
      }
      ).addTo(this.map);

    this.layerMultiLine=L.geoJSON(myRun, {
    style: function (feature) {
        return {color: "red"};
    }
    }).addTo(this.map);


    //bieganie punkty z geojson
    this.layerPoint=L.geoJSON(myRunPoints , {
        pointToLayer: function (feature, latlng) 
          {//wstawia marker w postaci okręgu
            return L.circleMarker(latlng, 
            ).bindPopup(feature.properties.time);
            }
      }
      ).addTo(this.map);
    // add marker
    this.marker = L.circleMarker([52.3, 21.0]).addTo(this.map);
 

    //table of latLng coordinates
    //loop on every coordinates and make latLng
    //loop on every latLng to make marker and push it to the table

  }

  render() {
    return <div className='fl w-50 pa2 vh-75'id="map"></div>
  }
}

export default LeafletMap;