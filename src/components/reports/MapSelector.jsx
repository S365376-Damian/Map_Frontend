import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import { useMapStore } from '../../stores/map'

function LocationPicker({ onSelect }) {
    const [position, setPosition] = useState(null)

    // hook để bắt sự kiện click
    useMapEvents({
        click(e) {
        const { lat, lng } = e.latlng
        setPosition([lat, lng])
        onSelect(lat, lng)
        },
    })

    return position ? <Marker position={position} /> : null
}

export default function MapSelector({ onSelect }) {
    const { center } = useMapStore();
    return (
        <MapContainer
        center={center} // vị trí mặc định HCM
        zoom={13}
        style={{ height: '400px', width: '100%', marginTop: '1rem' }}
        >
        <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationPicker onSelect={onSelect} />
        </MapContainer>
    )
}
