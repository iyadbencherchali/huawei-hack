"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// ─── Mock Building Data ─────────────────────────────────────
const BUILDINGS = [
  { "id": 1, "name": "Usine green 75", "neighborhood": "Alger", "lat": 36.7032, "lng": 3.0118, "roof": 1109, "potential": "medium", "capacity": 105.8, "production": 140416, "co2": 70.2, "homes": 40 },
  { "id": 2, "name": "Résidence numidie 22", "neighborhood": "Alger", "lat": 36.7588, "lng": 3.0903, "roof": 651, "potential": "medium", "capacity": 65.4, "production": 80112, "co2": 40.1, "homes": 22 },
  { "id": 3, "name": "Lycée numidie 28", "neighborhood": "Alger", "lat": 36.7547, "lng": 3.029, "roof": 1073, "potential": "medium", "capacity": 105.2, "production": 139169, "co2": 69.6, "homes": 39 },
  { "id": 4, "name": "Complexe el amel 3", "neighborhood": "Alger", "lat": 36.7849, "lng": 3.0763, "roof": 1302, "potential": "medium", "capacity": 150.9, "production": 185675, "co2": 92.8, "homes": 53 },
  { "id": 5, "name": "Résidence lala khadija 34", "neighborhood": "Alger", "lat": 36.7725, "lng": 3.0441, "roof": 178, "potential": "medium", "capacity": 18.0, "production": 22355, "co2": 11.2, "homes": 6 },
  { "id": 6, "name": "Usine numidie 20", "neighborhood": "Alger", "lat": 36.7523, "lng": 3.0267, "roof": 1493, "potential": "medium", "capacity": 151.7, "production": 182604, "co2": 91.3, "homes": 52 },
  { "id": 7, "name": "Villa sunlight 26", "neighborhood": "Alger", "lat": 36.7022, "lng": 3.0568, "roof": 923, "potential": "medium", "capacity": 89.4, "production": 116120, "co2": 58.1, "homes": 33 },
  { "id": 8, "name": "Hôpital lala khadija 36", "neighborhood": "Alger", "lat": 36.7214, "lng": 3.0475, "roof": 1034, "potential": "medium", "capacity": 94.7, "production": 130384, "co2": 65.2, "homes": 37 },
  { "id": 11, "name": "Lycée ennasr 41", "neighborhood": "Oran", "lat": 35.665, "lng": -0.6277, "roof": 541, "potential": "medium", "capacity": 61.2, "production": 85072, "co2": 42.5, "homes": 24 },
  { "id": 12, "name": "Villa green 27", "neighborhood": "Oran", "lat": 35.6567, "lng": -0.6622, "roof": 1121, "potential": "medium", "capacity": 104.9, "production": 142203, "co2": 71.1, "homes": 40 },
  { "id": 13, "name": "Lycée atlas 82", "neighborhood": "Oran", "lat": 35.6582, "lng": -0.6033, "roof": 1198, "potential": "medium", "capacity": 121.2, "production": 169007, "co2": 84.5, "homes": 48 },
  { "id": 14, "name": "Usine green 61", "neighborhood": "Oran", "lat": 35.7369, "lng": -0.612, "roof": 1201, "potential": "medium", "capacity": 109.2, "production": 156360, "co2": 78.2, "homes": 44 },
  { "id": 15, "name": "Éco-Quartier green 66", "neighborhood": "Oran", "lat": 35.7063, "lng": -0.5899, "roof": 989, "potential": "medium", "capacity": 110.1, "production": 147534, "co2": 73.8, "homes": 42 },
  { "id": 16, "name": "Lycée sunlight 24", "neighborhood": "Oran", "lat": 35.66, "lng": -0.6384, "roof": 1435, "potential": "medium", "capacity": 152.0, "production": 221768, "co2": 110.9, "homes": 63 },
  { "id": 17, "name": "Complexe sunlight 12", "neighborhood": "Oran", "lat": 35.71, "lng": -0.63, "roof": 230, "potential": "medium", "capacity": 25.0, "production": 35700, "co2": 17.8, "homes": 10 },
  { "id": 18, "name": "Lycée sahara 48", "neighborhood": "Constantine", "lat": 36.33, "lng": 6.63, "roof": 120, "potential": "medium", "capacity": 14.0, "production": 18480, "co2": 9.2, "homes": 5 },
  { "id": 21, "name": "Villa green 42", "neighborhood": "Ghardaia", "lat": 32.45, "lng": 3.65, "roof": 150, "potential": "high", "capacity": 18.0, "production": 30240, "co2": 15.1, "homes": 8 },
  { "id": 24, "name": "Usine tassili 99", "neighborhood": "Tamanrasset", "lat": 22.75, "lng": 5.5, "roof": 2000, "potential": "high", "capacity": 240.0, "production": 460800, "co2": 230.4, "homes": 131 },
  { "id": 26, "name": "Résidence numidie 11", "neighborhood": "Bechar", "lat": 31.6, "lng": -2.2, "roof": 400, "potential": "high", "capacity": 48.0, "production": 84480, "co2": 42.2, "homes": 24 },
  { "id": 27, "name": "Centre Commercial green 55", "neighborhood": "Ouargla", "lat": 31.9, "lng": 5.3, "roof": 1500, "potential": "high", "capacity": 180.0, "production": 309600, "co2": 154.8, "homes": 88 },
  { "id": 50, "name": "Complexe Atlas 43", "neighborhood": "Setif", "lat": 36.1772, "lng": 5.4184, "roof": 103, "potential": "medium", "capacity": 11.2, "production": 15637, "co2": 7.8, "homes": 4 },
  { "id": 51, "name": "Usine Lala Khadija 29", "neighborhood": "Setif", "lat": 36.1953, "lng": 5.3626, "roof": 1308, "potential": "medium", "capacity": 131.7, "production": 181282, "co2": 90.6, "homes": 51 },
  { "id": 52, "name": "Sommet Tassili 2", "neighborhood": "Setif", "lat": 36.16, "lng": 5.42, "roof": 1500, "potential": "high", "capacity": 180.0, "production": 252000, "co2": 126.0, "homes": 72 },
  { "id": 60, "name": "Centre Ghardaia 12", "neighborhood": "Ghardaia", "lat": 32.49, "lng": 3.67, "roof": 1200, "potential": "high", "capacity": 150.0, "production": 252000, "co2": 126.0, "homes": 72 },
  { "id": 70, "name": "Sommet Hoggar 5", "neighborhood": "Tamanrasset", "lat": 22.78, "lng": 5.52, "roof": 2000, "potential": "high", "capacity": 240.0, "production": 460800, "co2": 230.4, "homes": 131 },
  { "id": 80, "name": "Usine Sahara 33", "neighborhood": "Bechar", "lat": 31.62, "lng": -2.21, "roof": 1500, "potential": "high", "capacity": 180.0, "production": 316800, "co2": 158.4, "homes": 90 },
  { "id": 90, "name": "Complexe Petroleum 88", "neighborhood": "Ouargla", "lat": 31.95, "lng": 5.33, "roof": 1200, "potential": "high", "capacity": 144.0, "production": 247680, "co2": 123.8, "homes": 70 },
  { "id": 100, "name": "Villa Biskra 7", "neighborhood": "Biskra", "lat": 34.85, "lng": 5.73, "roof": 800, "potential": "medium", "capacity": 80.0, "production": 128000, "co2": 64.0, "homes": 36 },
  { "id": 110, "name": "Résidence Palace 12", "neighborhood": "Djelfa", "lat": 34.67, "lng": 3.25, "roof": 1000, "potential": "medium", "capacity": 100.0, "production": 152000, "co2": 76.0, "homes": 43 },
  { "id": 120, "name": "Usine Djelfa 55", "neighborhood": "Djelfa", "lat": 34.7, "lng": 3.3, "roof": 2000, "potential": "high", "capacity": 240.0, "production": 384000, "co2": 192.0, "homes": 109 },
  { "id": 121, "name": "Villa El Feth 12", "neighborhood": "Alger", "lat": 36.7211, "lng": 3.0854, "roof": 142, "potential": "medium", "capacity": 15.1, "production": 18120, "co2": 9.1, "homes": 5 },
  { "id": 122, "name": "Résidence Ennasr 88", "neighborhood": "Oran", "lat": 35.72, "lng": -0.58, "roof": 450, "potential": "medium", "capacity": 50.0, "production": 68000, "co2": 34.0, "homes": 19 },
  { "id": 123, "name": "Immeuble Tassili 44", "neighborhood": "Constantine", "lat": 36.4, "lng": 6.7, "roof": 600, "potential": "medium", "capacity": 72.0, "production": 95040, "co2": 47.5, "homes": 27 },
  { "id": 124, "name": "Lycée Atlas 11", "neighborhood": "Annaba", "lat": 36.88, "lng": 7.74, "roof": 750, "potential": "medium", "capacity": 85.0, "production": 105400, "co2": 52.7, "homes": 30 },
  { "id": 125, "name": "Hôpital Sahara 66", "neighborhood": "Ghardaia", "lat": 32.5, "lng": 3.7, "roof": 1100, "potential": "high", "capacity": 135.0, "production": 226800, "co2": 113.4, "homes": 64 },
  { "id": 126, "name": "Usine Hoggar 32", "neighborhood": "Tamanrasset", "lat": 22.85, "lng": 5.6, "roof": 1800, "potential": "high", "capacity": 216.0, "production": 414720, "co2": 207.4, "homes": 118 },
  { "id": 127, "name": "Complexe Petroleum 99", "neighborhood": "Ouargla", "lat": 32.0, "lng": 5.4, "roof": 1300, "potential": "high", "capacity": 156.0, "production": 268320, "co2": 134.2, "homes": 76 },
  { "id": 128, "name": "Villa Biskra 55", "neighborhood": "Biskra", "lat": 34.82, "lng": 5.78, "roof": 500, "potential": "high", "capacity": 65.0, "production": 104000, "co2": 52.0, "homes": 29 },
  { "id": 129, "name": "Immeuble Djelfa 22", "neighborhood": "Djelfa", "lat": 34.65, "lng": 3.28, "roof": 850, "potential": "medium", "capacity": 92.0, "production": 139840, "co2": 69.9, "homes": 39 },
  { "id": 130, "name": "Résidence Tlemcen 7", "neighborhood": "Tlemcen", "lat": 34.9, "lng": -1.3, "roof": 420, "potential": "medium", "capacity": 48.0, "production": 67200, "co2": 33.6, "homes": 19 },
  { "id": 131, "name": "Lycée Batna 14", "neighborhood": "Batna", "lat": 35.5, "lng": 6.2, "roof": 900, "potential": "medium", "capacity": 105.0, "production": 151200, "co2": 75.6, "homes": 43 },
  { "id": 132, "name": "Usine Chlef 81", "neighborhood": "Chlef", "lat": 36.1, "lng": 1.3, "roof": 1600, "potential": "medium", "capacity": 192.0, "production": 268800, "co2": 134.4, "homes": 76 },
  { "id": 133, "name": "Villa Tiaret 33", "neighborhood": "Tiaret", "lat": 35.3, "lng": 1.3, "roof": 320, "potential": "medium", "capacity": 38.0, "production": 53200, "co2": 26.6, "homes": 15 },
  { "id": 134, "name": "Immeuble Skikda 5", "neighborhood": "Skikda", "lat": 36.8, "lng": 6.9, "roof": 550, "potential": "medium", "capacity": 62.0, "production": 80600, "co2": 40.3, "homes": 23 },
  { "id": 135, "name": "Complexe Mascara 19", "neighborhood": "Mascara", "lat": 35.4, "lng": 0.1, "roof": 1100, "potential": "medium", "capacity": 132.0, "production": 198000, "co2": 99.0, "homes": 56 },
  { "id": 136, "name": "Hôpital Saida 47", "neighborhood": "Saida", "lat": 34.8, "lng": 0.1, "roof": 780, "potential": "medium", "capacity": 90.0, "production": 135000, "co2": 67.5, "homes": 38 },
  { "id": 137, "name": "Lycée Guelma 25", "neighborhood": "Guelma", "lat": 36.4, "lng": 7.4, "roof": 460, "potential": "medium", "capacity": 55.0, "production": 77000, "co2": 38.5, "homes": 22 },
  { "id": 138, "name": "Usine Tebessa 92", "neighborhood": "Tebessa", "lat": 35.4, "lng": 8.1, "roof": 1400, "potential": "medium", "capacity": 168.0, "production": 243600, "co2": 121.8, "homes": 69 },
  { "id": 139, "name": "Villa El Oued 63", "neighborhood": "El Oued", "lat": 33.3, "lng": 6.8, "roof": 280, "potential": "high", "capacity": 35.0, "production": 63000, "co2": 31.5, "homes": 18 },
  { "id": 140, "name": "Immeuble Laghouat 21", "neighborhood": "Laghouat", "lat": 33.8, "lng": 2.8, "roof": 670, "potential": "high", "capacity": 84.0, "production": 151200, "co2": 75.6, "homes": 43 },
  { "id": 141, "name": "Résidence Adrar 88", "neighborhood": "Adrar", "lat": 27.8, "lng": -0.2, "roof": 900, "potential": "high", "capacity": 110.0, "production": 220000, "co2": 110.0, "homes": 62 },
  { "id": 142, "name": "Complexe In Salah 5", "neighborhood": "In Salah", "lat": 27.2, "lng": 2.5, "roof": 1500, "potential": "high", "capacity": 185.0, "production": 407000, "co2": 203.5, "homes": 116 },
  { "id": 143, "name": "Usine Illizi 77", "neighborhood": "Illizi", "lat": 26.5, "lng": 8.5, "roof": 1200, "potential": "high", "capacity": 148.0, "production": 310800, "co2": 155.4, "homes": 88 },
  { "id": 144, "name": "Hôpital Djanet 12", "neighborhood": "Djanet", "lat": 24.5, "lng": 9.5, "roof": 820, "potential": "high", "capacity": 102.0, "production": 214200, "co2": 107.1, "homes": 61 },
  { "id": 145, "name": "Lycée Tindouf 33", "neighborhood": "Tindouf", "lat": 27.6, "lng": -8.1, "roof": 340, "potential": "high", "capacity": 42.0, "production": 88200, "co2": 44.1, "homes": 25 },
  { "id": 146, "name": "Villa Jijel 11", "neighborhood": "Jijel", "lat": 36.8, "lng": 5.7, "roof": 190, "potential": "medium", "capacity": 22.0, "production": 28600, "co2": 14.3, "homes": 8 },
  { "id": 147, "name": "Immeuble Bejaia 44", "neighborhood": "Bejaia", "lat": 36.7, "lng": 5.0, "roof": 510, "potential": "medium", "capacity": 60.0, "production": 78000, "co2": 39.0, "homes": 22 },
  { "id": 148, "name": "Résidence Tipaza 9", "neighborhood": "Tipaza", "lat": 36.6, "lng": 2.4, "roof": 320, "potential": "medium", "capacity": 38.0, "production": 49400, "co2": 24.7, "homes": 14 },
  { "id": 149, "name": "Usine Bouira 52", "neighborhood": "Bouira", "lat": 36.3, "lng": 3.9, "roof": 1100, "potential": "medium", "capacity": 135.0, "production": 182250, "co2": 91.1, "homes": 52 },
  { "id": 150, "name": "Villa Medea 11", "neighborhood": "Medea", "lat": 36.26, "lng": 2.75, "roof": 210, "potential": "medium", "capacity": 25.0, "production": 35000, "co2": 17.5, "homes": 10 },
  { "id": 151, "name": "Immeuble Boumerdes 77", "neighborhood": "Boumerdes", "lat": 36.76, "lng": 3.47, "roof": 480, "potential": "medium", "capacity": 55.0, "production": 71500, "co2": 35.8, "homes": 20 },
  { "id": 152, "name": "Résidence Blida 9", "neighborhood": "Blida", "lat": 36.47, "lng": 2.83, "roof": 340, "potential": "medium", "capacity": 40.0, "production": 56000, "co2": 28.0, "homes": 16 },
  { "id": 153, "name": "Usine Ain Defla 32", "neighborhood": "Ain Defla", "lat": 36.26, "lng": 2.22, "roof": 1500, "potential": "medium", "capacity": 180.0, "production": 243000, "co2": 121.5, "homes": 69 },
  { "id": 154, "name": "Hôpital Relizane 66", "neighborhood": "Relizane", "lat": 35.74, "lng": 0.55, "roof": 900, "potential": "medium", "capacity": 110.0, "production": 154000, "co2": 77.0, "homes": 44 },
  { "id": 155, "name": "Lycée Mostaganem 25", "neighborhood": "Mostaganem", "lat": 35.93, "lng": 0.09, "roof": 620, "potential": "medium", "capacity": 75.0, "production": 105000, "co2": 52.5, "homes": 30 },
  { "id": 156, "name": "Villa Sidi Bel Abbes 12", "neighborhood": "Sidi Bel Abbes", "lat": 35.19, "lng": -0.63, "roof": 280, "potential": "medium", "capacity": 35.0, "production": 49000, "co2": 24.5, "homes": 14 },
  { "id": 157, "name": "Immeuble El Bayadh 5", "neighborhood": "El Bayadh", "lat": 33.68, "lng": 1.01, "roof": 550, "potential": "high", "capacity": 70.0, "production": 126000, "co2": 63.0, "homes": 36 },
  { "id": 158, "name": "Complexe Naama 19", "neighborhood": "Naama", "lat": 33.27, "lng": -0.31, "roof": 1300, "potential": "high", "capacity": 160.0, "production": 304000, "co2": 152.0, "homes": 86 },
  { "id": 159, "name": "Usine Souk Ahras 77", "neighborhood": "Souk Ahras", "lat": 36.28, "lng": 7.95, "roof": 1100, "potential": "medium", "capacity": 130.0, "production": 169000, "co2": 84.5, "homes": 48 },
  { "id": 160, "name": "Villa Oum El Bouaghi 33", "neighborhood": "Oum El Bouaghi", "lat": 35.87, "lng": 7.11, "roof": 320, "potential": "medium", "capacity": 38.0, "production": 49400, "co2": 24.7, "homes": 14 },
  { "id": 161, "name": "Immeuble Bordj Bou Arreridj 22", "neighborhood": "Bordj Bou Arreridj", "lat": 36.07, "lng": 4.76, "roof": 850, "potential": "medium", "capacity": 100.0, "production": 140000, "co2": 70.0, "homes": 40 },
  { "id": 162, "name": "Résidence M'Sila 88", "neighborhood": "M'Sila", "lat": 35.7, "lng": 4.54, "roof": 700, "potential": "medium", "capacity": 85.0, "production": 119000, "co2": 59.5, "homes": 34 },
  { "id": 163, "name": "Complexe El Tarf 5", "neighborhood": "El Tarf", "lat": 36.76, "lng": 8.31, "roof": 1200, "potential": "medium", "capacity": 145.0, "production": 188500, "co2": 94.3, "homes": 53 },
  { "id": 164, "name": "Usine Khenchela 92", "neighborhood": "Khenchela", "lat": 35.43, "lng": 7.14, "roof": 1400, "potential": "medium", "capacity": 170.0, "production": 238000, "co2": 119.0, "homes": 68 },
  { "id": 165, "name": "Hôpital Mila 47", "neighborhood": "Mila", "lat": 36.45, "lng": 6.26, "roof": 800, "potential": "medium", "capacity": 95.0, "production": 133000, "co2": 66.5, "homes": 38 },
  { "id": 166, "name": "Lycée Tipaza 14", "neighborhood": "Tipaza", "lat": 36.59, "lng": 2.44, "roof": 440, "potential": "medium", "capacity": 52.0, "production": 67600, "co2": 33.8, "homes": 19 },
  { "id": 167, "name": "Villa Ain Temouchent 63", "neighborhood": "Ain Temouchent", "lat": 35.3, "lng": -1.14, "roof": 260, "potential": "medium", "capacity": 32.0, "production": 44800, "co2": 22.4, "homes": 12 },
  { "id": 168, "name": "Immeuble Ghardaia North 21", "neighborhood": "Ghardaia", "lat": 32.65, "lng": 3.67, "roof": 650, "potential": "high", "capacity": 80.0, "production": 160000, "co2": 80.0, "homes": 45 },
  { "id": 169, "name": "Résidence Ouargla East 88", "neighborhood": "Ouargla", "lat": 31.95, "lng": 5.55, "roof": 950, "potential": "high", "capacity": 120.0, "production": 240000, "co2": 120.0, "homes": 68 },
  { "id": 170, "name": "Complexe Biskra Center 5", "neighborhood": "Biskra", "lat": 34.85, "lng": 5.73, "roof": 1600, "potential": "high", "capacity": 200.0, "production": 380000, "co2": 190.0, "homes": 108 },
  { "id": 171, "name": "Usine Laghouat South 77", "neighborhood": "Laghouat", "lat": 33.6, "lng": 2.8, "roof": 1100, "potential": "high", "capacity": 140.0, "production": 252000, "co2": 126.0, "homes": 72 },
  { "id": 172, "name": "Hôpital El Oued West 12", "neighborhood": "El Oued", "lat": 33.3, "lng": 6.6, "roof": 880, "potential": "high", "capacity": 110.0, "production": 220000, "co2": 110.0, "homes": 62 },
  { "id": 173, "name": "Lycée Bechar East 33", "neighborhood": "Bechar", "lat": 31.6, "lng": -2.0, "roof": 400, "potential": "high", "capacity": 50.0, "production": 95000, "co2": 47.5, "homes": 27 },
  { "id": 174, "name": "Villa Adrar Center 11", "neighborhood": "Adrar", "lat": 27.87, "lng": -0.28, "roof": 220, "potential": "high", "capacity": 30.0, "production": 60000, "co2": 30.0, "homes": 17 },
  { "id": 175, "name": "Immeuble In Salah North 44", "neighborhood": "In Salah", "lat": 27.4, "lng": 2.5, "roof": 500, "potential": "high", "capacity": 65.0, "production": 143000, "co2": 71.5, "homes": 40 },
  { "id": 176, "name": "Résidence Illizi Center 9", "neighborhood": "Illizi", "lat": 26.5, "lng": 8.48, "roof": 320, "potential": "high", "capacity": 42.0, "production": 88200, "co2": 44.1, "homes": 25 },
  { "id": 177, "name": "Usine Djanet South 52", "neighborhood": "Djanet", "lat": 24.4, "lng": 9.5, "roof": 1500, "potential": "high", "capacity": 190.0, "production": 399000, "co2": 199.5, "homes": 114 },
  { "id": 178, "name": "Hôpital Tindouf West 88", "neighborhood": "Tindouf", "lat": 27.6, "lng": -8.3, "roof": 850, "potential": "high", "capacity": 105.0, "production": 220500, "co2": 110.3, "homes": 63 },
  { "id": 179, "name": "Complexe Tamanrasset Hoggar 55", "neighborhood": "Tamanrasset", "lat": 22.8, "lng": 5.5, "roof": 2500, "potential": "high", "capacity": 300.0, "production": 630000, "co2": 315.0, "homes": 180 },
  { "id": 180, "name": "Villa Ghardaia Palm 12", "neighborhood": "Ghardaia", "lat": 32.48, "lng": 3.75, "roof": 180, "potential": "high", "capacity": 22.0, "production": 44000, "co2": 22.0, "homes": 12 },
  { "id": 181, "name": "Immeuble Ouargla Petroleum 8", "neighborhood": "Ouargla", "lat": 31.9, "lng": 5.3, "roof": 600, "potential": "high", "capacity": 75.0, "production": 150000, "co2": 75.0, "homes": 42 },
  { "id": 182, "name": "Usine Biskra Date 41", "neighborhood": "Biskra", "lat": 34.8, "lng": 5.7, "roof": 1200, "potential": "high", "capacity": 150.0, "production": 285000, "co2": 142.5, "homes": 81 },
  { "id": 183, "name": "Complexe El Oued Sand 66", "neighborhood": "El Oued", "lat": 33.35, "lng": 6.85, "roof": 1400, "potential": "high", "capacity": 175.0, "production": 350000, "co2": 175.0, "homes": 100 },
  { "id": 184, "name": "Résidence Adrar Sun 5", "neighborhood": "Adrar", "lat": 27.8, "lng": -0.3, "roof": 400, "potential": "high", "capacity": 55.0, "production": 115500, "co2": 57.8, "homes": 33 },
  { "id": 185, "name": "Hôpital Bechar Oasis 77", "neighborhood": "Bechar", "lat": 31.62, "lng": -2.25, "roof": 800, "potential": "high", "capacity": 100.0, "production": 190000, "co2": 95.0, "homes": 54 },
  { "id": 186, "name": "Lycée Laghouat Atlas 33", "neighborhood": "Laghouat", "lat": 33.8, "lng": 2.9, "roof": 350, "potential": "high", "capacity": 45.0, "production": 81000, "co2": 40.5, "homes": 23 },
  { "id": 187, "name": "Villa Djelfa Steppe 11", "neighborhood": "Djelfa", "lat": 34.6, "lng": 3.2, "roof": 250, "potential": "medium", "capacity": 30.0, "production": 45000, "co2": 22.5, "homes": 12 },
  { "id": 188, "name": "Immeuble Tiaret Plateau 44", "neighborhood": "Tiaret", "lat": 35.35, "lng": 1.4, "roof": 550, "potential": "medium", "capacity": 65.0, "production": 91000, "co2": 45.5, "homes": 26 },
  { "id": 189, "name": "Usine Chlef Valley 9", "neighborhood": "Chlef", "lat": 36.15, "lng": 1.35, "roof": 1100, "potential": "medium", "capacity": 135.0, "production": 189000, "co2": 94.5, "homes": 54 },
  { "id": 190, "name": "Résidence Saida Alpha 52", "neighborhood": "Saida", "lat": 34.85, "lng": 0.15, "roof": 420, "potential": "medium", "capacity": 50.0, "production": 70000, "co2": 35.0, "homes": 20 },
  { "id": 191, "name": "Hôpital Tlemcen Center 14", "neighborhood": "Tlemcen", "lat": 34.88, "lng": -1.31, "roof": 900, "potential": "medium", "capacity": 110.0, "production": 154000, "co2": 77.0, "homes": 44 },
  { "id": 192, "name": "Villa Oran Coastal 63", "neighborhood": "Oran", "lat": 35.75, "lng": -0.65, "roof": 300, "potential": "medium", "capacity": 38.0, "production": 53200, "co2": 26.6, "homes": 15 },
  { "id": 193, "name": "Immeuble Alger Centre 44", "neighborhood": "Alger", "lat": 36.75, "lng": 3.05, "roof": 700, "potential": "medium", "capacity": 85.0, "production": 110500, "co2": 55.3, "homes": 31 },
  { "id": 194, "name": "Lycée Constantine Rock 12", "neighborhood": "Constantine", "lat": 36.36, "lng": 6.61, "roof": 480, "potential": "medium", "capacity": 58.0, "production": 75400, "co2": 37.7, "homes": 21 },
  { "id": 195, "name": "Villa Setif High 88", "neighborhood": "Setif", "lat": 36.2, "lng": 5.4, "roof": 220, "potential": "high", "capacity": 30.0, "production": 42000, "co2": 21.0, "homes": 12 },
  { "id": 196, "name": "Immeuble Annaba Port 9", "neighborhood": "Annaba", "lat": 36.9, "lng": 7.76, "roof": 520, "potential": "medium", "capacity": 62.0, "production": 74400, "co2": 37.2, "homes": 21 },
  { "id": 197, "name": "Usine Skikda Petroleum 12", "neighborhood": "Skikda", "lat": 36.85, "lng": 6.95, "roof": 1800, "potential": "medium", "capacity": 210.0, "production": 273000, "co2": 136.5, "homes": 78 },
  { "id": 198, "name": "Hôpital Batna Aures 33", "neighborhood": "Batna", "lat": 35.55, "lng": 6.17, "roof": 1100, "potential": "medium", "capacity": 130.0, "production": 182000, "co2": 91.0, "homes": 52 },
  { "id": 199, "name": "Villa Jijel Corniche 11", "neighborhood": "Jijel", "lat": 36.82, "lng": 5.75, "roof": 150, "potential": "medium", "capacity": 18.0, "production": 23400, "co2": 11.7, "homes": 6 }
];

const NEIGHBORHOODS = ["All", ...Array.from(new Set(BUILDINGS.map(b => b.neighborhood)))];
const POTENTIALS = ["All", "high", "medium", "low"];

const COLORS = { high: "#10b981", medium: "#f59e0b", low: "#ef4444" };
const LABELS = { high: "High Potential", medium: "Medium Potential", low: "Low Potential" };

// ─── Lazy-loaded Map Component (avoids SSR issues with Leaflet) ─────────────
const CityMap = dynamic(() => import("./CityMapInner"), { ssr: false, loading: () => (
  <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1E3A5F", borderRadius: "16px" }}>
    <div style={{ color: "white", textAlign: "center" }}>
      <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🗺️</div>
      <div style={{ fontWeight: 600 }}>Loading Map...</div>
    </div>
  </div>
)});

// ─── Main Page ───────────────────────────────────────────────
export default function CityMapDashboard() {
  const [selected, setSelected] = useState(null);
  const [neighborhoodFilter, setNeighborhoodFilter] = useState("All");
  const [potentialFilter, setPotentialFilter] = useState("All");

  const filtered = BUILDINGS.filter(b =>
    (neighborhoodFilter === "All" || b.neighborhood === neighborhoodFilter) &&
    (potentialFilter === "All" || b.potential === potentialFilter)
  );

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "#f8fafc", fontFamily: "var(--font-body)" }}>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(135deg, var(--blue) 0%, #0f1c2e 100%)", padding: "48px 0 40px", color: "white" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <Link href="/#city-map" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>← Back to Overview</Link>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
                <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", padding: "3px 10px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>LIVE</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, marginBottom: "8px" }}>🏙️ Solar Algeria Map</h1>
              <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", lineHeight: 1.5 }}>
                Interactive map showing solar potential across Algeria. Click any marker to explore local building capacity and simulate installations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "16px 0" }}>
        <div className="container" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontWeight: 700, color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Filter:</span>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-secondary)", marginRight: "4px" }}>City:</span>
            {NEIGHBORHOODS.map(n => (
              <button key={n} onClick={() => setNeighborhoodFilter(n)} style={{ padding: "6px 14px", borderRadius: "100px", border: "1px solid", borderColor: neighborhoodFilter === n ? "var(--blue)" : "var(--gray-200)", background: neighborhoodFilter === n ? "var(--blue)" : "white", color: neighborhoodFilter === n ? "white" : "var(--text-secondary)", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.15s" }}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ width: "1px", height: "24px", background: "var(--gray-200)" }} />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-secondary)", marginRight: "4px" }}>Potential:</span>
            {POTENTIALS.map(p => (
              <button key={p} onClick={() => setPotentialFilter(p)} style={{ padding: "6px 14px", borderRadius: "100px", border: "1px solid", borderColor: potentialFilter === p ? (COLORS[p] || "var(--blue)") : "var(--gray-200)", background: potentialFilter === p ? (COLORS[p] || "var(--blue)") : "white", color: potentialFilter === p ? "white" : "var(--text-secondary)", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.15s" }}>
                {p === "All" ? "All" : LABELS[p]}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
            {filtered.length} locations shown
          </div>
        </div>
      </div>

      {/* ── Map + Side Panel ── */}
      <div className="container" style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: "20px", padding: "24px 20px", alignItems: "start" }}>
        {/* Map */}
        <div style={{ height: "600px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0", position: "relative" }}>
          {/* Legend */}
          <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 1000, background: "white", borderRadius: "12px", padding: "12px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", border: "1px solid #e2e8f0" }}>
            {Object.entries(COLORS).map(([k, color]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: color }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>{LABELS[k]}</span>
              </div>
            ))}
            <hr style={{ margin: "10px 0", border: "0", borderTop: "1px solid #eee" }} />
            <Link href="/docs#city-map" style={{ fontSize: "0.7rem", color: "var(--blue)", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
              📖 Map Methodology →
            </Link>
          </div>
          <CityMap buildings={filtered} onSelect={setSelected} selected={selected} />
        </div>

        {/* Side Panel */}
        {selected && (
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden", position: "sticky", top: "100px" }}>
            {/* Panel Header */}
            <div style={{ background: `linear-gradient(135deg, ${COLORS[selected.potential]}, ${COLORS[selected.potential]}bb)`, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ background: "rgba(255,255,255,0.25)", color: "white", padding: "3px 10px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>{LABELS[selected.potential]}</span>
                  <h2 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "1.3rem", marginTop: "8px", fontWeight: 700 }}>{selected.name}</h2>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", marginTop: "4px" }}>📍 {selected.neighborhood}, Algiers</p>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                {[
                  { label: "Roof Surface", value: `${selected.roof} m²`, icon: "📐" },
                  { label: "System Size", value: `${selected.capacity} kW`, icon: "⚡" },
                  { label: "Annual Production", value: `${selected.production.toLocaleString()} kWh`, icon: "☀️" },
                  { label: "CO₂ Avoided", value: `${selected.co2} t/yr`, icon: "🌱" },
                  { label: "Homes Powered", value: `${selected.homes} homes`, icon: "🏠" },
                  { label: "Est. ROI", value: "~8 years", icon: "💰" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "1rem", marginBottom: "4px" }}>{s.icon}</div>
                    <div style={{ fontWeight: 800, color: "var(--blue)", fontSize: "1rem" }}>{s.value}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Energy Bar */}
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#16a34a", textTransform: "uppercase", marginBottom: "8px" }}>Annual Energy Coverage</div>
                <div style={{ height: "8px", background: "#dcfce7", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "112%", maxWidth: "100%", background: "linear-gradient(90deg, #16a34a, #4ade80)", borderRadius: "4px" }} />
                </div>
                <div style={{ marginTop: "6px", fontSize: "0.8rem", color: "#16a34a", fontWeight: 600 }}>112% — Surplus exported to grid</div>
              </div>

              <Link href="/simulation" style={{ display: "block", textAlign: "center", background: "var(--blue)", color: "white", padding: "14px 24px", borderRadius: "12px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", transition: "transform 0.2s", marginBottom: "10px" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                ☀️ Simulate on this Rooftop →
              </Link>
              <button onClick={() => setSelected(null)} style={{ display: "block", width: "100%", textAlign: "center", background: "transparent", border: "1px solid #e2e8f0", color: "var(--text-secondary)", padding: "10px", borderRadius: "12px", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
                Close Panel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Building List ── */}
      <div className="container" style={{ paddingBottom: "60px" }}>
        <h2 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "16px", color: "var(--text-primary)" }}>
          All Buildings ({filtered.length})
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: "14px" }}>
          {filtered.map(b => (
            <div key={b.id} onClick={() => setSelected(b)} style={{ background: "white", borderRadius: "12px", padding: "16px 20px", border: `1px solid ${selected?.id === b.id ? COLORS[b.potential] : "#e2e8f0"}`, cursor: "pointer", transition: "all 0.2s", boxShadow: selected?.id === b.id ? `0 0 0 2px ${COLORS[b.potential]}33` : "none" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.08)`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = selected?.id === b.id ? `0 0 0 2px ${COLORS[b.potential]}33` : "none"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: COLORS[b.potential], flexShrink: 0 }} />
                <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", margin: 0 }}>{b.name}</h4>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "10px", fontWeight: 600 }}>📍 {b.neighborhood}</p>
              <div style={{ display: "flex", gap: "12px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <span>⚡ {b.capacity} kW</span>
                <span>☀️ {(b.production / 1000).toFixed(1)} MWh</span>
                <span>🌱 {b.co2}t CO₂</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
