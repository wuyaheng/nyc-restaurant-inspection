import React from "react";
import L from "leaflet";

export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER = document.getElementById("map-container");
    console.log(props.pins) 

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER.appendChild(MAP_ID);

      const mymap = L.map("mapid").setView([props.lat, props.lon], 12);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(mymap);

      var blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      props.pins.forEach((pin) => {
        if (pin.critical_flag == 'N') {
          L.marker([pin.latitude, pin.longitude],{icon: blueIcon}).addTo(mymap).bindTooltip("<h6><b>" + pin.dba + "</b></h6><p class='p-0 m-0'> Address: " + pin.building +" "+ pin.street + "</p><p class='p-0 m-0'>Phone: " + pin.phone + "</p>Critical Flag: " + pin.critical_flag + "<p class='p-0 m-0'>Violation Description: " + pin.violation_description + "</p>")
        } else {
          L.marker([pin.latitude, pin.longitude],{icon: redIcon}).addTo(mymap).bindTooltip("<h6><b>" + pin.dba + "</b></h6><p class='p-0 m-0'> Address: " + pin.building +" "+ pin.street + "</p><p class='p-0 m-0'>Phone: " + pin.phone + "</p>Critical Flag: " + pin.critical_flag + "<p class='p-0 m-0'>Violation Description: " + pin.violation_description + "</p>")      
        }
        
      });
    }

    return () => (MAP_CONTAINER.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container"></div>;
};
