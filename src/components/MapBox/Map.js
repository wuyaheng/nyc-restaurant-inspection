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

      props.pins.forEach((pin) =>
        L.marker([pin.latitude, pin.longitude]).addTo(mymap).bindTooltip("<h6><b>" + pin.dba + "</b></h6>Critical Flag: " + pin.critical_flag + "<p class='p-0 m-0'>Violation Description: " + pin.violation_description + "</p>")
      );
    }

    return () => (MAP_CONTAINER.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container"></div>;
};
