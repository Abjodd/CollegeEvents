"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "leaflet/dist/leaflet.css";

// ✅ Dynamically Import Leaflet Components with `ssr: false`
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const CollegeMap = () => {
  const collegeCenter = [12.908602, 77.566345];
  const [isClient, setIsClient] = useState(false);
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    setIsClient(true);

  
    import("leaflet").then((L) => {
      setCustomIcon(
        L.icon({
          iconUrl: "/pointer.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40],
          popupAnchor: [0, -35],
        })
      );
    });
  }, []);

  const departments = [
    { name: "DAYANADA SAGAR UNIVERSITY", location: [12.90878378102423, 77.56607168364484] },
    { name: "Computer Science", location: [12.907817213405911, 77.56609996717788] },
    { name: "Information Science", location: [12.907817213405911, 77.56609996717788] },
    { name: "AMPHI THEATER", location: [12.90808652224577, 77.5661809167708] },
    { name: "AIML", location: [12.907920047525788, 77.56608912485639] },
    { name: "Library", location: [12.909078814130657, 77.56698169869853] },
    { name: "Canteen", location: [12.90851853977232, 77.56629315994199] },
    { name: "COMPUTER SCIENCE AND DESIGN", location: [12.908332628530218, 77.56567993026873] },
    { name: "Aeronautical Engineering", location: [12.908686804653064, 77.56817124160874] },
    { name: "Automobile Engineering", location: [12.908686804653064, 77.56817124160874] },
    { name: "Mechanical Engineering", location: [12.90856016751201, 77.56769676605406] },
    { name: "Electrical Engineering", location: [12.90827921698314, 77.56773302140243] },
    { name: "CEMICAL Engineering", location: [12.907890222448275, 77.56785100361218] },
    { name: "Civil Engineering", location: [12.90854088993952, 77.56549995003373] },
    { name: "Electronics & Communication", location: [12.907654236797802, 77.56563920043018] },
    { name: "Biotechnology", location: [12.907713744987596, 77.56774877442645] },
    { name: "football", location: [12.907132213576187, 77.56662449246487] },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 z-[10]">
          {isClient && customIcon && ( // ✅ Render only when client & icon is set
            <MapContainer
              center={collegeCenter}
              zoom={18}
              minZoom={15} 
              maxZoom={22}
              className="w-full h-full rounded-lg"
            >
              {/* 🔹 Use High-Resolution Tile Layer */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxNativeZoom={19}
                maxZoom={22}
              />

              {/* 📍 College Location */}
              <Marker position={collegeCenter} icon={customIcon}>
                <Popup>Dayananda Sagar College of Engineering</Popup>
              </Marker>

              {/* 🔹 Department Markers */}
              {departments.map((dept, index) => (
                <Marker key={index} position={dept.location} icon={customIcon}>
                  <Popup>{dept.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </main>
      </div>
    </div>
  );
};

export default CollegeMap;
