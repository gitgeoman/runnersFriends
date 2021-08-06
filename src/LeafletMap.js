import React, { Component } from "react";

//import bibliotek leaflet
import L from "leaflet";
import "leaflet/dist/leaflet.css";

//naprawa zwalonych ikonek
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import icon1 from "./data/img/SHGPUCAT--ED.svg";
import icon2 from "./data/img/SFGPUCAT--ED.svg";
import icon3 from "./data/img/SHGP------AH (1).svg";

let DefaultIcon = L.icon({
  iconUrl: icon1,
  shadowUrl: iconShadow,
});

let MasterIcon = L.icon({
  iconUrl: icon,
  iconSize: [50, 50], // size of the icon
});
L.Marker.prototype.options.icon = DefaultIcon;

class LeafletMap extends Component {
  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [52.29756190868707, 21.250407],
      zoom: 8,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    //z geoservera
    const URL = `http://localhost:8080/geoserver/AMyWorkspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AMyWorkspace%3Apec015&maxFeatures=50&outputFormat=application%2Fjson`;

    const oddajObiekt = (aoo) => {
      console.log(aoo);
      switch (aoo) {
        case 999:
          return {
            iconUrl: icon1,
            iconSize: [30, 30],
          };
        case 90:
          return {
            iconUrl: icon2,
            iconSize: [30, 30],
          };
        case 190:
          return {
            iconUrl: icon3,
            iconSize: [100, 100],
          };
        default:
          return {
            iconUrl: icon3,
            iconSize: [20, 20],
          };
      }
    };

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: L.icon(oddajObiekt(feature.properties.aoo)),
            });
          },
        }).addTo(this.map);
      });

    //koniec z geoservera

    //obiekt geojson przepisany do zmiennej
    let geodata = this.props.obiekty; // tak odwołuję się do obiektu który jest wysłany przez rodzica
    let popupOBJECTID = this.props.hoverID;
    let toggle = this.props.toggle;
    //console.log(toggle);

    this.layerMarkers = L.geoJSON(geodata, {
      pointToLayer: function (feature, latlng) {
        //wstawia marker w postaci okręgu
        return L.circleMarker(latlng).bindPopup(
          feature.properties.description.name
        );
        //.on('mouseover', function(e){this.openPopup()})
        //.on('mouseout', function(e){this.closePopup()})
      },
    }).addTo(this.map);
  } //koniec Component didMount

  updateMarkers(markersData) {
    this.layerMarkers.clearLayers();
    this.layerMarkers = L.geoJSON(markersData, {
      pointToLayer: function (feature, latlng) {
        //wstawia marker w postaci okręgu
        return L.circleMarker(latlng).bindPopup(
          feature.properties.description.name
        );
      },
    }).addTo(this.map);
  }

  createMarkers(hoveredMarker) {
    //czyszczenie warstwy z markerami
    //tworzenie nowej warstwy z markerami
    if (this.specialLayer) {
      this.specialLayer.clearLayers();
    }
    this.specialLayer = L.geoJSON(hoveredMarker, {
      pointToLayer: function (feature, latlng) {
        //wstawia marker w postaci okręgu
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        }).bindPopup(feature.properties.description.name);
      },
    }).addTo(this.map);
  }

  componentDidUpdate({ popupOBJECTID, geodata, toggle }) {
    // -->> sprawdzam co sie zmieniło w danych
    if (this.props.toggle !== toggle || this.props.obiekty !== geodata) {
      //jezeli zmienil sie toggle lub zmienil sie input data
      this.updateMarkers(this.props.obiekty); //aktualizuj obiekty
      if (this.props.hoverID !== popupOBJECTID && this.props.hoverID !== "") {
        //jezeli najechano na hovera i hover ma wartosc to
        this.createMarkers(this.props.obiekty[Number(this.props.hoverID) - 1]);
      }
      if (this.props.toggle === false) {
        if (this.specialLayer) {
          this.specialLayer.clearLayers();
        }
      }
    }
  } //koniec componetdidupdate

  render() {
    return <div className="fl w-50 pa2 vh-75" id="map"></div>;
  }
}
export default LeafletMap;
