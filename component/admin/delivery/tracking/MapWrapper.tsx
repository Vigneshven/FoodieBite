"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => {
    <div>Loading map...</div>;
  },
});

export default function MapWrapper() {
  return <MapView />;
}
