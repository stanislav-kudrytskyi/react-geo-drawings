import { useCallback, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Point } from '../../index';
import { useMapboxMap } from './MapContext';

interface MapboxMarkerProps {
    coordinates?: Point;
    draggable?: boolean;
    onChange?: (coordinates: Point) => void;
}

const MapboxMarker = ({ coordinates, draggable, onChange }: MapboxMarkerProps): null => {
    const [markerObject, setMarkerObject] = useState<mapboxgl.Marker|null>(null);
    const map = useMapboxMap();

    useEffect(() => {
        if (!coordinates || !map) {
            return;
        }
        const marker = markerObject || new mapboxgl.Marker();
        marker.setLngLat([coordinates.lng, coordinates.lat]);
        marker.addTo(map);
        marker.setDraggable(draggable || false);
        setMarkerObject(marker);
    }, [map, coordinates, markerObject, draggable]);

    useEffect(() => {
        if (!markerObject || !onChange) {
            return;
        }

        markerObject.on('dragend', () => {
            const point = markerObject.getLngLat();
            onChange({
                lat: point.lat,
                lng: point.lng,
            });
        });
    }, [markerObject]);

    return null;
};

export default MapboxMarker;
