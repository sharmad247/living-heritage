import React, { Component } from 'react'
import Map from './Map'

export default class MapContainer extends Component {
  render() {
    return (
        <Map
            id="myMap"
            options={{
                center: { lat: 41.0082, lng: 28.9784 },
                zoom: 8
            }}
            onMapLoad={map => {
                window.google.maps.Marker({
                position: { lat: 41.0082, lng: 28.9784 },
                map: map,
                title: 'Hello Istanbul!'
                });
            }}
            />
        );
    }
}
