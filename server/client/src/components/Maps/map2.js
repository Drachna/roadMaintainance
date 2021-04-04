import React, { Component } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import Worker from "worker-loader!./Worker.js";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = 'pk.eyJ1IjoicmFjaG5hZGV2cyIsImEiOiJja2t4azQ1NTMya3I4Mm9zMWF3encxZmVpIn0.rrFsJ2qtgCWXXMSz4PAw-A';




class Map extends Component {
  
  constructor(props) {
    super(props);
    // this.state = {
    //   lng: 73.98,
    //   lat: 15.21,
    //   zoom: 14
    // };
    this.initialState={
      lng: 73.98,
      lat: 15.21,
      zoom: 14
    }
    // console.log(this.props.coordinates);
    if (this.props.coordinates){
      this.state=this.props.coordinates
    }
    else{
      this.state=this.initialState
    }
    // console.log(this.state);
  }


  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(this.successLocation, this.erroorLocation, { enableHighAccuracy: true })
    // console.log(this.state);
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    // map.addControl(
    //   new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl
    //   })
    //   );

    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(map);


    // map.on('move', () => {
    //   this.setState({
    //     lng: map.getCenter().lng.toFixed(4),
    //     lat: map.getCenter().lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2)
    //   });
    // });

    const onDragEnd = () => {
      var lngLat = marker.getLngLat();
      // coordinates.style.display = 'block';
      // coordinates.innerHTML =
      // 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
      this.setState({
        lng: lngLat.lng,
        lat: lngLat.lat,
        zoom: map.getZoom().toFixed(2)
      });
      this.props.setLatLng(this.state.lat,this.state.lng)

    }
    marker.on('dragend', onDragEnd);

    // console.log(map);
    // var coordinates = document.getElementById('coordinates');
  }
   successLocation = (position) => {
    this.setState({
      // lng: position.coords.longitude,
      // lat: position.coords.latitude,
    })
  }
  
   erroorLocation = (position) => {
  
  }






  render() {
    return (
      <div className="map-wrapper">
        <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.mapContainer = el} id="map"/>
      </div>
    );
  }
}

export default Map;
