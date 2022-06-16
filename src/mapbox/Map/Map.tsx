import mapboxgl from 'mapbox-gl';
import { RefObject, useEffect, useRef } from 'react';
import { Point } from '../../index';

interface MapProps {
    container: RefObject<HTMLElement>;
    center?: Point;
    onInit?: (map: mapboxgl.Map) => void;
}

const DEFAULT_ZOOM = 9;

const Map = ({ container, center, onInit }: MapProps): null => {
    const map = useRef<mapboxgl.Map|null>(null);
    useEffect(() => {
        if (map.current) {
            return;
        }
        const options: mapboxgl.MapboxOptions = {
            container: container.current || '',
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: DEFAULT_ZOOM,
        };

        if (center) {
            options.center = [center.lng, center.lat];
        }

        map.current = new mapboxgl.Map(options);
        if (onInit) {
            onInit(map.current);
        }
    });

    return null;
};

export default Map;
