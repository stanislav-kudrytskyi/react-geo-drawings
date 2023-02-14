import React, { ReactNode, RefObject } from 'react';
import {
    GOOGLE, MAPBOX, useApiKey, useProvider,
} from './MapProvider';
import { GoogleMapProvider } from '../google/Map/MapContext';
import MapboxProvider from '../mapbox/Map/MapContext';
import { Point } from '../index';
import { PolygonDisplaySettings } from './Polygon';

interface GeoMapProps {
    containerRef: RefObject<HTMLDivElement>;
    children?: ReactNode;
    center?: Point;
    minZoom?: number;
    addedPolygonDisplaySettings?: PolygonDisplaySettings;
}

const GeoMap = ({
    containerRef, children, center, minZoom, addedPolygonDisplaySettings,
}: GeoMapProps): JSX.Element => {
    const provider = useProvider();
    const apiKey = useApiKey();

    if (provider === GOOGLE) {
        return (
            <GoogleMapProvider
                containerRef={containerRef}
                googleApiKey={apiKey}
                center={center}
                minZoom={minZoom}
                addedPolygonDisplaySettings={addedPolygonDisplaySettings}
            >
                {children}
            </GoogleMapProvider>
        );
    }

    if (provider === MAPBOX) {
        return (
            <MapboxProvider
                containerRef={containerRef}
                apiKey={apiKey}
                center={center}
            >
                {children}
            </MapboxProvider>
        );
    }

    throw new Error(`Unknown provider: ${provider}`);
};

export default GeoMap;
