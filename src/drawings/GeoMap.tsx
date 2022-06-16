import React, { ReactNode, RefObject } from 'react';
import {
    GOOGLE, MAPBOX, useApiKey, useProvider,
} from './MapProvider';
import { GoogleMapProvider } from '../google/Map/MapContext';
import MapboxProvider from '../mapbox/Map/MapContext';
import { Point } from '../index';

interface GeoMapProps {
    containerRef: RefObject<HTMLDivElement>;
    children?: ReactNode;
    center?: Point
}

const GeoMap = ({ containerRef, children, center }: GeoMapProps): JSX.Element => {
    const provider = useProvider();
    const apiKey = useApiKey();

    if (provider === GOOGLE) {
        return (
            <GoogleMapProvider containerRef={containerRef} googleApiKey={apiKey}>
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
