import {
    createContext, ReactNode, RefObject, useContext, useReducer,
} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './Map';
import { Point } from '../../index';

export interface MapProviderProps {
    containerRef: RefObject<HTMLDivElement>;
    children?: ReactNode;
    center?: Point;
    apiKey?: string;
}

interface MapboxMapState {
    map?: mapboxgl.Map
}

type Action = {
    type: 'setMap',
    data: mapboxgl.Map
}

const mapReducer = (state: MapboxMapState, action: Action): MapboxMapState => {
    const { type, data } = action;
    switch (type) {
        case 'setMap':
            return {
                ...state,
                map: data,
            };
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};

const MapContext = createContext<MapboxMapState|undefined>(undefined);

const MapboxProvider = ({
    children, containerRef, apiKey, center,
}: MapProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(mapReducer, { map: undefined });
    mapboxgl.accessToken = apiKey || '';

    return (
        <MapContext.Provider value={state}>
            <Map
                container={containerRef}
                center={center}
                onInit={(map) => (dispatch({ type: 'setMap', data: map }))}
            />
            {children}
        </MapContext.Provider>
    );
};

export const useMapboxMap = (): mapboxgl.Map|undefined => {
    const context = useContext(MapContext);

    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider');
    }

    return context.map;
};

export default MapboxProvider;
