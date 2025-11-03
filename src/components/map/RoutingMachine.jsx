import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const RoutingMachine = ({ start, end }) => {
  const map = useMap();
  useEffect(() => {
    if (!start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng),
        L.latLng(end.lat, end.lng),
      ],
      lineOptions: {
        styles: [
          { color: "#1976d2", weight: 5, opacity: 0.8 }, 
        ],
      },
      show: false, 
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: function (i, wp) {
        const icon = L.divIcon({
          className: "route-marker",
          html: `<div style="
            background-color: ${i === 0 ? "#2e7d32" : "#c62828"};
            width: 30px;
            height:30px;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
          ">${i === 0 ? "From" : "To"}</div>`,
          iconSize: [30, 30],
        });
        return L.marker(wp.latLng, { icon });
      },
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [start, end, map]);

  return null;
};

export default RoutingMachine;
