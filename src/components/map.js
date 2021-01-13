import React, { Component, useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class ShowMap extends React.Component {
    constructor(props) {
        super(props);

       this.state = {
           dataLoaded : false,
           lat:null,
           lng:null
       };

       


    }


    render() {
     
        console.log(this.props.location['latitude'] + " " + this.props.location['longitude']);
        
        return(
<div class="map">
<MapContainer center={[this.props.location['latitude'], this.props.location['longitude']]} zoom={17} scrollWheelZoom={false} style={{ height: "100vh"}}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[this.props.location['latitude'], this.props.location['longitude']]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
</div>


        )
        
        }
        
        
}

