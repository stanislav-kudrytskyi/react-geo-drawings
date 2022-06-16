import React, {
    createContext, ReactNode, useContext, useState,
} from 'react';
import { PolygonBoard } from './PolygonBoard';
import { DisplaySettingsProvider } from './DisplaySettingsProvider';

export const GOOGLE = 'google';
export const MAPBOX = 'mapbox';
type Provider = 'google'|'openstreetmap'|'mapbox';
export interface MapProviderProps {
    provider: Provider;
    apiKey?: string;
    children?: ReactNode;
}

type MapState = {
    provider: Provider;
    apiKey?: string
}

const MapContext = createContext<MapState|undefined>(undefined);

export const MapProvider = ({
    provider, apiKey, children,
}: MapProviderProps): JSX.Element => {
    const [mapState] = useState<MapState>({ provider, apiKey });
    if (provider !== GOOGLE && provider !== MAPBOX) {
        throw new Error(`Unsupported map provider: ${provider}`);
    }
    return (
        <MapContext.Provider value={mapState}>
            <DisplaySettingsProvider>
                <PolygonBoard>
                    {children}
                </PolygonBoard>
            </DisplaySettingsProvider>
        </MapContext.Provider>
    );
};

export const useProvider = (): Provider => {
    const context = useContext(MapContext);
    if (!context?.provider) {
        throw new Error('Failed to get Map Provider');
    }
    return context.provider;
};
export const useApiKey = (): string => {
    const context = useContext(MapContext);
    return context?.apiKey || '';
};
