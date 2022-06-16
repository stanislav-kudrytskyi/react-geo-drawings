import {
    RefObject, useEffect,
} from 'react';
import { useGoogleMap } from './MapContext';

interface MapProps {
    container: RefObject<HTMLDivElement>;
    onInit: (map: google.maps.Map) => void;
}

const Map = ({ container, onInit }: MapProps) => {
    const map = useGoogleMap();

    useEffect(() => {
        if (container.current && !map) {
            onInit(new google.maps.Map(container.current as HTMLDivElement, {
                center: { lat: 48.466, lng: 57.118 },
                zoom: 5,
            }));
        }
    });

    return null;
};

export default Map;
