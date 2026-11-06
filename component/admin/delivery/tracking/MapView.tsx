"use client";

import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";

import type { LatLngExpression } from "leaflet";
import MapSizeHandler from "./utils/MapSizeHandler";

const restaurantPosition: LatLngExpression = [12.9165, 79.1325];
const riderPosition: LatLngExpression = [12.9195, 79.1375];
const customerPosition: LatLngExpression = [12.9235, 79.1435];

const deliveryRoute: LatLngExpression[] = [
  restaurantPosition,
  [12.9175, 79.134],
  [12.9185, 79.1355],
  riderPosition,
  [12.921, 79.139],
  [12.922, 79.141],
  customerPosition,
];

export default function MapView() {
  return (
    <MapContainer
      center={[12.9165, 79.1325]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full min-h-87.5 w-full rounded-xl"
    >
      <MapSizeHandler />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline
        positions={deliveryRoute}
        pathOptions={{
          color: "#2563eb",
          weight: 5,
          opacity: 0.85,
        }}
      />
      <CircleMarker
        center={restaurantPosition}
        radius={10}
        pathOptions={{
          color: "#ffffff",
          weight: 3,
          fillColor: "#f97316",
          fillOpacity: 1,
        }}
      >
        <Tooltip direction="bottom">Restaurant</Tooltip>
        <Popup>
          <div>
            <strong>Pizza Palace</strong>
            <p>Restauran Pickup Location</p>
          </div>
        </Popup>
      </CircleMarker>
      <CircleMarker
        center={riderPosition}
        radius={11}
        pathOptions={{
          color: "#ffffff",
          weight: 3,
          fillColor: "#2563eb",
          fillOpacity: 1,
        }}
      >
        <Tooltip direction="left">Delivery Partner</Tooltip>
        <Popup>
          <div>
            <strong>Test3</strong>
            <p>Current sample rider location</p>
          </div>
        </Popup>
      </CircleMarker>
      <CircleMarker
        center={customerPosition}
        radius={10}
        pathOptions={{
          color: "#ffffff",
          weight: 3,
          fillColor: "#16a34a",
          fillOpacity: 1,
        }}
      >
        <Tooltip direction="top">Customer</Tooltip>
        <Popup>
          <div>
            <strong>Test1</strong>
            <p>Delivery Destination</p>
          </div>
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
}
