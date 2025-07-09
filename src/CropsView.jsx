import { useState, useEffect } from "react";
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import greenMarkerIcon from './assets/MapMarker_Ball__Green.png';

const customIcon = L.icon({
    iconUrl: greenMarkerIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
});

function CropsView() {
    const [crops, setCrops] = useState([]);
    const [selectedCrops, setSelectedCrops] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const cropsData = await GetAllCrops();
            if (cropsData) {
                setCrops(cropsData);
            }
        };

        fetchData();
    }, []);

    const handleToggle = (cropId) => {
        console.log(cropId);
        setSelectedCrops((prevSelected) =>
            prevSelected.includes(cropId)
                ? prevSelected.filter((id) => id !== cropId)
                : [...prevSelected, cropId]
        );
    };

    return (
        <div>
            <h2>Cultivos</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Mapa */}
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: "50%", height: "400px" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {crops
                        .filter((crop) => selectedCrops.includes(crop.id) && crop.location.latitude && crop.location.longitude)
                        .map((crop) => (
                            <Marker
                                key={crop.id}
                                position={[crop.location.latitude, crop.location.longitude]}
                                icon={customIcon}
                            >
                                <Popup>
                                    <strong>{crop.name}</strong><br />
                                    Agua requerida: {crop.waterRequired} l/m²<br />
                                    Altura de la raíz: {crop.rootHeight} m
                                </Popup>
                            </Marker>
                        ))}
                </MapContainer>

                {/* Tabla de cultivos */}
                <table border="1" style={{ width: "45%" }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Agua requerida</th>
                            <th>Altura promedio de la raíz</th>
                            <th>Ver en el mapa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crops.map((crop) => (
                            <tr key={crop.id}>
                                <td>{crop.name}</td>
                                <td>{crop.waterRequired} l/m²</td>
                                <td>{crop.rootHeight} m</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleToggle(crop.id)}
                                        checked={selectedCrops.includes(crop.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

async function GetAllCrops() {
    try {
        const response = await axios.get('https://irrigation-suggester-mini-core-service.onrender.com/api/crop/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        if (response.data.status === 'SUCCESS') {
            return response.data.data;
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403) {
                // navigate("/");
            } else if (error.response.status === 404) {
                alert(`Error al buscar cultivos: ${error.response.data.message}`);
            } else if (error.response.status === 500) {
                alert('Error interno del servidor. Inténtalo de nuevo más tarde.');
            }
        } else {
            console.error("Error desconocido:", error);
        }
        return undefined;
    }
}

export default CropsView;
