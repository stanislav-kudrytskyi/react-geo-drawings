import React, { ReactNode, RefObject } from 'react';
import {
    GOOGLE, MAPBOX, useApiKey, useProvider,
} from './MapProvider';
import { GoogleMapProvider } from '../google/Map/MapContext';
import MapboxProvider from '../mapbox/Map/MapContext';
import { Point } from '../index';
import { PolygonDisplaySettings } from './Polygon';
import { DrawingMode } from './constants';
import { Localization, LocalizationProvider } from './LocalizationProvider';

export interface GeoMapProps {
    containerRef: RefObject<HTMLDivElement>;
    children?: ReactNode;
    center?: Point;
    modes?: DrawingMode[],
    minZoom?: number;
    zoom?: number;
    onZoomChange?: (zoom?: number) => void;
    localization?: Localization;
    addedPolygonDisplaySettings?: PolygonDisplaySettings;
}

const GeoMap = ({
    containerRef, children, center, minZoom, addedPolygonDisplaySettings, zoom, localization, onZoomChange, modes,
}: GeoMapProps): JSX.Element => {
    const provider = useProvider();
    const apiKey = useApiKey();
    if (provider === GOOGLE) {
        return (
            <LocalizationProvider localization={localization}>
                <GoogleMapProvider
                    containerRef={containerRef}
                    googleApiKey={apiKey}
                    center={center}
                    minZoom={minZoom}
                    zoom={zoom}
                    modes={modes}
                    onZoomChange={onZoomChange}
                    addedPolygonDisplaySettings={addedPolygonDisplaySettings}
                >
                    {children}
                </GoogleMapProvider>
            </LocalizationProvider>
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
