import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { geolocated } from "react-geolocated";
import React from 'react'
import L from "leaflet";
import { Component } from 'react';

class Map extends Component {
  state = {
    latitude: 19,
    longitude: 73,
    zoom: 2,
    draggable: true,
  }
  exampleRef = React.createRef()
   componentDidMount() {
    const latitude =  this.props.coords ? this.props.coords.latitude : 19
    const longitude =  this.props.coords ? this.props.coords.longitude : 73
    this.setState({
      latitude,
      longitude
    })
  }

  updateMarker=e=>{
    // console.log(e);
    // const latLng = e.getLatLng 
    //  console.log((latLng));
    // console.log(e.target.getLatLng(),'ha');
    // this.setState({
      
    // })
    // console.log(latLng);
  }
  render() {
    const latitude = this.props.coords ? this.props.coords.latitude : null
    const longitude = this.props.coords ? this.props.coords.longitude : 0
    console.log(latitude, longitude, this.props.coords);
    // console.log(this.state.latitude, this.state.longitude);
    return (
      this.props.coords ?
        <MapContainer center={[latitude, longitude]} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        
           
              <Marker
              key="0"
            marker_index="0"
              ref={this.exampleRef}
                position={[latitude, longitude]}
                draggable={this.state.draggable}
                // onDragend={this.updateMarker()} 
                onDrag={this.updateMarker}
                // eventHandlers={this.updateMarker}
              ></Marker>
          
        </MapContainer > :null
    )
  }

}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Map)

