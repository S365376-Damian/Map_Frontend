import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Bán kính Trái Đất (m)
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const RoutingMachine = ({ start, end, approveReports }) => {
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

    routingControl.on("routesfound", function (e) {
      const route = e.routes[0];
      const latlngs = route.coordinates;

      // Kiểm tra từng điểm cảnh báo
      approveReports.forEach((report) => {
        const near = latlngs.some((pt) => {
          const dist = getDistance(pt.lat, pt.lng, report.latitude, report.longitude);
          return dist < 50; // 50m là "gần"
        });

        if (near) {
          // 🟠 Hiện cảnh báo
          L.popup()
            .setLatLng([report.latitude, report.longitude])
            .setContent(`<b>Hazard Alert!</b><br>${report.name}`)
            .openOn(map);
        }
      });
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [start, end, map]);

  return null;
};

export default RoutingMachine;
