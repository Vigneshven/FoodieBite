import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapSizeHandler() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(container);

    map.invalidateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
}
