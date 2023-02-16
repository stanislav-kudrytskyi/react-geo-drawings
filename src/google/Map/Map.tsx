import {
    RefObject, useEffect,
} from 'react';
import { useGoogleMap } from './MapContext';
import { Point } from '../../index';

interface MapProps {
    container: RefObject<HTMLDivElement>;
    onInit: (map: google.maps.Map) => void;
    center?: Point;
    minZoom?: number;
}

const Map = ({
    container, onInit, center, minZoom,
}: MapProps) => {
    const map = useGoogleMap();

    useEffect(() => {
        if (container.current && !map) {
            onInit(new google.maps.Map(container.current as HTMLDivElement, {
                center: { lat: center?.lat || 48.466, lng: center?.lng || 57.118 },
                zoom: 5,
                minZoom,
            }));
        }
    });

    return null;
};

export default Map;
