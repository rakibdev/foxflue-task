<template>
  <div class="map" ref="map_ref" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useState } from '../state.js';

const { pickup_address, pickup_distance } = useState();
const map_ref = ref(null);
let map = null;

const getAddressPosition = async address => {
  const response = await fetch(
    `http://api.positionstack.com/v1/forward?access_key=58ec0925cdd441256bbf914e2cdd609b&query=${address}`
  );
  const { data } = await response.json();
  return { lat: data[0].latitude, lng: data[0].longitude };
};

const getCurrentPosition = () => {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(location => {
      resolve({ lat: location.coords.latitude, lng: location.coords.longitude });
    });
  });
};

const createMarker = position => {
  const icon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillOpacity: 1,
    fillColor: '#005fb1',
    strokeWeight: 3,
    strokeColor: '#ffffff'
  };
  const marker = new google.maps.Marker({
    map,
    position,
    icon
  });
  return marker;
};

const getDistanceMiles = (marker, marker2) => {
  const R = 3958.8;
  const rlat1 = marker.position.lat() * (Math.PI / 180);
  const rlat2 = marker2.position.lat() * (Math.PI / 180);
  const difflat = rlat2 - rlat1;
  const difflon = (marker2.position.lng() - marker.position.lng()) * (Math.PI / 180);
  const distance =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)
      )
    );
  return distance.toFixed(2);
};

window.onMapsLoaded = async () => {
  map = new google.maps.Map(map_ref.value, {
    zoom: 8,
    minZoom: 1,
    disableDefaultUI: true,
    gestureHandling: 'greedy'
  });
  if (!navigator.geolocation) return console.warn('Geolocation API is not available');
  const position = await getCurrentPosition();
  map.panTo(position);
  const marker = createMarker(position);
  const pickup_position = await getAddressPosition(pickup_address.value);
  const pickup_marker = createMarker(pickup_position);
  new google.maps.Polyline({
    map,
    path: [position, pickup_position],
    strokeColor: '#005fb1'
  });
  pickup_distance.value = getDistanceMiles(marker, pickup_marker);
};

const loadGoogleMaps = () => {
  const script = document.createElement('script');
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCNSwQBpPvd_ZuR93-_Et2o8MvMsHR7CeY&callback=onMapsLoaded&v=weekly';
  script.async = true;
  document.head.appendChild(script);
};
onMounted(loadGoogleMaps);
</script>

<style scoped>
.map {
  height: 300px;
}
</style>
