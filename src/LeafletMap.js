import React, {Component} from 'react';

//import bibliotek leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
//import danych
import {myRun} from './data/runningData.js'; //Multiline
import {myRunPoints} from './data/runningDataPoints';

//naprawa zwalonych ikonek
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
      center: [52.29756190868707,21.250407],
      zoom: 8,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
    
    //obiekt geojson przepisany do zmiennej
    let geodata = this.props.obiekty; // tak odwołuję się do obiektu który jest wysłany przez rodzica
      
    this.layerMarkers=L.geoJSON(geodata , {
        pointToLayer: function (feature, latlng) 
          {//wstawia marker w postaci okręgu
            return L.circleMarker(latlng, 
            ).bindPopup(feature.properties.description.name);
            }
      }
      ).addTo(this.map);

/*
    //dane  geojson typu multilinia
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
*/
  } //koniec Component didMount

    updateMarkers(markersData) {
      this.layerMarkers.clearLayers();
     this.layerMarkers = L.geoJSON(markersData , {
          pointToLayer: function (feature, latlng) 
            {//wstawia marker w postaci okręgu
              return L.circleMarker(latlng, 
              ).bindPopup(feature.properties.description.name);
              }
        }
        ).addTo(this.map);
    }

    componentDidUpdate({obiekty, geodata}) {
    // check if data has changed -->> sprawdzam co sie zmieniło w danych i wyzwalam funkcję
        if (this.props.obiekty !== geodata) {  
          this.updateMarkers(this.props.obiekty);
        }
    }//koniec componetdidupdate

  render() {
    return <div className='fl w-50 pa2 vh-75' id="map"></div>
  }
}
export default LeafletMap;