// api info

let getIP = async (ipAdd) =>{
    let key = "at_hEsyUKd40yEbo0r8InUvazbIUm5d1";
    const getUrl = `https://geo.ipify.org/api/v2/country?apiKey=${key}&ipAddress=${ipAdd}`;
    const response = await fetch(getUrl);
    const data = await response.json();
    return data;
}

const buttonFun = document.getElementById('btn').addEventListener('click', async(e) =>{
    let input = document.getElementById('input');
    let ip = document.getElementById('ip');
    let loc= document.getElementById('loc');
    let time= document.getElementById('time');
    let isp= document.getElementById('isp');

    e.preventDefault();
    ipAdd = input.value;
    console.log(ipAdd);
    let r = await getIP(ipAdd);
    console.log(r);
    ip.innerHTML = r.ip;
    let locat = `${r.location.country}, ${r.location.region}`;
    loc.innerHTML = `${r.location.country}, ${r.location.region}`;
    time.innerHTML= `UTC${r.location.timezone}`;
    isp.innerHTML= r.isp;
    getLocationInfo(locat);
});



// use and implement map

const ShowMap = (lat, lon) =>{

    var map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([lat, lon]).addTo(map);

};


// adding position to the map

const getLocationInfo = (query) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const location = data[0];
                lat = location.lat;
                lon = location.lon;
                ShowMap(lat,lon);
            }
             else {
                console.error("Location not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching location information:", error);
        });

};
