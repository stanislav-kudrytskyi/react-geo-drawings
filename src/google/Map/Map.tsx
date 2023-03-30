import {
    RefObject, useEffect,
} from 'react';
import { useGoogleMap } from './MapContext';
import { Point } from '../../index';

const DEFAULT_ZOOM = 5;

export interface MapProps {
    onInit: (map: google.maps.Map) => void;
    containerRef: RefObject<HTMLDivElement>;
    center?: Point;
    minZoom?: number;
    zoom?: number;
    onZoomChange?: (zoom?: number) => void;
}

const Map = ({
    containerRef, onInit, center, minZoom, zoom, onZoomChange,
}: MapProps) => {
    const map = useGoogleMap();

    useEffect(() => {
        if (containerRef.current && !map) {
            const m = new google.maps.Map(containerRef.current as HTMLDivElement, {
                center: { lat: center?.lat || 48.466, lng: center?.lng || 57.118 },
                zoom: zoom || DEFAULT_ZOOM,
                mapTypeControl: false,
                streetViewControl: false,
                minZoom,
            });
            onInit(m);
        }
    });

    useEffect(() => {
        let zoomListener: google.maps.MapsEventListener|undefined;
        if (map && onZoomChange) {
            zoomListener = google.maps.event.addListener(map, 'zoom_changed', () => {
                onZoomChange(map.getZoom());
            });
        }

        return () => {
            if (zoomListener) {
                google.maps.event.removeListener(zoomListener);
            }
        };
    }, [map, onZoomChange]);

    useEffect(() => {
        if (zoom !== undefined) {
            map?.setZoom(zoom);
        }
    }, [map, zoom]);

    useEffect(() => {
        if (!map || !center) {
            return;
        }
        map.setCenter({ lat: center.lat, lng: center.lng });
    }, [map, center]);

    return null;
};

export default Map;
