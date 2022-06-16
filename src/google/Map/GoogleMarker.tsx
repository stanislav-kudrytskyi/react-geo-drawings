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
        if (!map) {
            return;
        }
        if (marker) {
            setMarkerObject(marker);
            return;
        }
        const newMarker = new google.maps.Marker({
            position: coordinates,
            map,
            draggable,
        });
        setMarkerObject(newMarker);
    }, [map, marker, coordinates]);

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
