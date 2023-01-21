let input = document.querySelector('input'),
    enterKey = document.getElementById("enter"),
    ipAddress = document.getElementById("ip"),
    state = document.getElementById("state"),
    city = document.getElementById("city"),
    postalCode = document.getElementById("postal-code"),
    utcValue = document.getElementById("utc-value"),
    ispValue = document.getElementById("isp");


var map = L.map('map').setView([40.69371, -73.98596], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([40.69371, -73.98596]).addTo(map)
    .bindPopup('Downtown Brooklyn')
    .openPopup();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

enterKey.addEventListener("click", function(){
    map.off();
    map.remove();
    fetchInputIpAddress();
});

input.addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        map.off();
        map.remove();
        fetchInputIpAddress();
    }
});

function fetchInputIpAddress(){
    var url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_BtZR9zJi8z3lWCZA1dn9ihdAycOgp&ipAddress=';
    var urlInput = url + input.value;
    fetch(urlInput)
    .then(data => data.json())
    .then(loc => {
        var locs = loc.location;
        ipAddress.innerText = loc.ip;
        city.innerText = locs.city;
        state.innerText = locs.region;
        postalCode.innerText = locs.postalCode;
        utcValue.innerText = locs.timezone;
        ispValue.innerText = loc.isp;

        var lat = loc.location.lat;
        var lng = loc.location.lng;

        map = L.map('map').setView([lat, lng], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup(locs.city)
            .openPopup();
        })
    .catch(error => {
        console.error(error);
    });
}