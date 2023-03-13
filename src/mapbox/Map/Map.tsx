import { RefObject, useEffect, useRef } from 'react';
import { Point } from '../../index';
import { useMapboxGl } from './MapContext';
import { MapboxMap, MapboxMapOptions } from '../types';

interface MapProps {
    container: RefObject<HTMLElement>;
    center?: Point;
    onInit?: (map: MapboxMap) => void;
}

const DEFAULT_ZOOM = 9;

const Map = ({ container, center, onInit }: MapProps): null => {
    const map = useRef<MapboxMap|null>(null);
    const mapboxgl = useMapboxGl();
    useEffect(() => {
        if (map.current || !mapboxgl) {
            return;
        }
        const options: MapboxMapOptions = {
            container: container.current || '',
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: DEFAULT_ZOOM,
        } as MapboxMapOptions;

        if (center) {
            options.center = [center.lng, center.lat];
        }
        map.current = new mapboxgl.Map(options);
        if (onInit) {
            onInit(map.current as MapboxMap);
        }
    });

    return null;
};

export default Map;
