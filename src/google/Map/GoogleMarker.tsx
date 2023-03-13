import { useEffect, useState } from 'react';
import { Point } from '../..';
import { useGoogleMap } from './MapContext';

interface GoogleMarkerProps {
    marker?: google.maps.Marker;
    coordinates?: Point;
    draggable?: boolean;
    onChange?: (coordinates: Point) => void;
}

const GoogleMarker = ({
    marker, coordinates, draggable, onChange,
}: GoogleMarkerProps): null => {
    const [markerObject, setMarkerObject] = useState<google.maps.Marker|null>(null);
    const map = useGoogleMap();

    useEffect(() => {
        if (marker && !markerObject) {
            setMarkerObject(marker);
        }
    }, [marker, markerObject]);

    useEffect(() => {
        if (!map || markerObject) {
            return;
        }

        const newMarker = new google.maps.Marker({
            position: coordinates,
            map,
            draggable,
        });
        setMarkerObject(newMarker);
    }, [map, markerObject]);

    useEffect(() => {
        if (!markerObject || !coordinates) {
            return;
        }

        const { lat, lng } = coordinates;

        if (lat === undefined || lng === undefined) {
            return;
        }

        markerObject.setPosition({ lat, lng });
    }, [markerObject, coordinates]);

    useEffect(() => {
        if (!markerObject) {
            return;
        }
        markerObject.setDraggable(draggable || null);
    }, [draggable, markerObject]);

    useEffect(() => () => {
        markerObject?.setMap(null);
        setMarkerObject(null);
    }, []);

    useEffect(() => {
        let listener: google.maps.MapsEventListener;
        if (markerObject && onChange) {
            listener = google.maps.event.addListener(markerObject, 'dragend', () => {
                onChange({ lat: markerObject.getPosition()!.lat(), lng: markerObject.getPosition()!.lng() });
            });
        }

        return () => {
            if (listener) {
                google.maps.event.removeListener(listener);
            }
        };
    }, [markerObject, onChange]);

    return null;
};

export default GoogleMarker;
