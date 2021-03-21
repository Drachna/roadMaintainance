import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// import Worker from "worker-loader!./Worker.js";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const MAPBOX_TOKEN ='pk.eyJ1IjoicmFjaG5hZGV2cyIsImEiOiJja2t4azQ1NTMya3I4Mm9zMWF3encxZmVpIn0.rrFsJ2qtgCWXXMSz4PAw-A';

export default function Maps() {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    />
  );
}
