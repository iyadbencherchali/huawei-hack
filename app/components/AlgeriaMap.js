"use client";
import React, { useState } from "react";
import { Map } from "react-algeria-map";

const getRegionFromProvince = (provName) => {
    const southProvinces = ["Adrar", "Tamanrasset", "Illizi", "Ouargla", "Tindouf", "Ghardaïa", "Béchar", "El Bayadh", "Bordj Badji Mokhtar", "Béni Abbès", "Djanet", "El Meghaier", "El Menia", "El Oued", "In Guezzam", "In Salah", "Touggourt", "Timimoun", "Ouled Djellal"];
    const highPlateauProvinces = ["Sétif", "Batna", "Djelfa", "Tiaret", "M'Sila", "Bordj Bou Arreridj", "Khenchela", "Tébessa", "Souk Ahras", "Oum El Bouaghi", "Médéa", "Saïda", "El Bayadh", "Naâma"];

    if (southProvinces.includes(provName)) return "sud";
    if (highPlateauProvinces.includes(provName)) return "hauts";
    return "nord"; // default for coastal regions
};

const mapData = {
    "Adrar": "Adrar", "Alger": "Alger", "Annaba": "Annaba", "Aïn Defla": "Aïn Defla", "Aïn Témouchent": "Aïn Témouchent",
    "Batna": "Batna", "Biskra": "Biskra", "Blida": "Blida", "Bordj Badji Mokhtar": "Bordj Badji Mokhtar", "Bordj Bou Arreridj": "Bordj Bou Arreridj",
    "Bouira": "Bouira", "Boumerdès": "Boumerdès", "Béchar": "Béchar", "Béjaïa": "Béjaïa", "Béni Abbès": "Béni Abbès",
    "Chlef": "Chlef", "Constantine": "Constantine", "Djanet": "Djanet", "Djelfa": "Djelfa", "El Bayadh": "El Bayadh",
    "El Meghaier": "El Meghaier", "El Menia": "El Menia", "El Oued": "El Oued", "El Tarf": "El Tarf", "Ghardaïa": "Ghardaïa",
    "Guelma": "Guelma", "Illizi": "Illizi", "In Guezzam": "In Guezzam", "In Salah": "In Salah", "Jijel": "Jijel",
    "Khenchela": "Khenchela", "Laghouat": "Laghouat", "M'Sila": "M'Sila", "Mascara": "Mascara", "Mila": "Mila",
    "Mostaganem": "Mostaganem", "Médéa": "Médéa", "Naâma": "Naâma", "Oran": "Oran", "Ouargla": "Ouargla",
    "Ouled Djellal": "Ouled Djellal", "Oum El Bouaghi": "Oum El Bouaghi", "Relizane": "Relizane", "Saïda": "Saïda",
    "Sidi Bel Abbès": "Sidi Bel Abbès", "Skikda": "Skikda", "Souk Ahras": "Souk Ahras", "Sétif": "Sétif", "Tamanrasset": "Tamanrasset",
    "Tiaret": "Tiaret", "Timimoun": "Timimoun", "Tindouf": "Tindouf", "Tipaza": "Tipaza", "Tissemsilt": "Tissemsilt",
    "Tizi Ouzou": "Tizi Ouzou", "Tlemcen": "Tlemcen", "Touggourt": "Touggourt", "Tébessa": "Tébessa"
};

export default function AlgeriaMap({ onSelectRegion }) {
    const [selectedProvince, setSelectedProvince] = useState(null);

    const handleWilayaClick = (wilaya, dataValue) => {
        setSelectedProvince(wilaya);
        const regionId = getRegionFromProvince(wilaya);

        if (onSelectRegion) {
            onSelectRegion({
                province: wilaya,
                zoneId: regionId
            });
        }
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "400px", background: "var(--cream)", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "center", alignItems: "center" }}>

            {selectedProvince && (
                <div style={{
                    position: "absolute", bottom: 16, left: 16,
                    background: "var(--orange)", padding: "8px 16px",
                    borderRadius: "20px", color: "white", fontSize: "0.85rem", fontWeight: 700,
                    zIndex: 10
                }}>
                    Sélectionné : {selectedProvince}
                </div>
            )}

            <Map
                color="#CFD8DC"
                HoverColor="#ffc078"
                stroke="#FFF"
                hoverStroke="#db5a04"
                height="100%"
                width="100%"
                data={mapData}
                onWilayaClick={handleWilayaClick}
            />
        </div>
    );
}
