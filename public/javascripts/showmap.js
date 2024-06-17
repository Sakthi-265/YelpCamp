 
 
 
const key = 'jOMALPRUe6EScUe5V5sC';
const map = L.map('map').setView([49.2125578, 16.62662018], 14); //starting position
L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{ //style URL
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        crossOrigin: true,
}).addTo(map);
L.control.maptilerGeocoding({ apiKey: key,}).addTo(map);
console.log(map)
const marker = L.marker([49.2125578, 16.62662018]).addTo(map);