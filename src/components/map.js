import React, { Component, useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

//to make the marker icon show up
//See: https://github.com/PaulLeCam/react-leaflet/issues/453
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


function CreateAndDisplayMap(props) {

  return (
    <div class="map">
    <MapContainer center={[props.details['coordinates']['latitude'], props.details['coordinates']['longitude']]} zoom={17} scrollWheelZoom={false} style={{ height: "100vh"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[props.details['coordinates']['latitude'], props.details['coordinates']['longitude']]}>
        <Popup>
          {props.details['name']}
        </Popup>
      </Marker>
    </MapContainer>
    </div>
    
  );
}

export default CreateAndDisplayMap;