import { fetchData } from "./fetchWrapper.js";
export async function initLeafletMap() {
    console.log("initializing the map");
// 1) Init
    const map = L.map('leafletMap').setView([45.5019, -73.5674], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

//  2) Fetch the content of the places.json using the fetch API
    const placesUri = "data/places.json";
    const locations = await fetchData(placesUri);
    console.log(locations.categories)
    console.log(locations.places)
    // 3) Loop over the locations.places array, and for each place, create a marker object
    //  and add it to the map.
    // The marker need to be populated with corresponding place info: the address, coordinates
    renderLocations(map,locations)
}
function renderLocations(map, locations){
    locations.places.forEach(place => {
        const category = locations.categories.find(category => category.id === place.categoryId)
        var myIcon = L.icon({
            iconUrl: category.markerIcon 
        });
        var marker = L.marker([place.point.lat, place.point.long], {icon: myIcon}).addTo(map);
        marker.bindPopup(`<b>${place.name}</b><br>${place.address}<br>`).openPopup();
        
});
}