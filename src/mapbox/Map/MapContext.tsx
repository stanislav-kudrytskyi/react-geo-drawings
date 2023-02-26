import {
    createContext, ReactNode, RefObject, useContext, useEffect, useReducer,
} from 'react';
import Map from './Map';
import { Point } from '../../index';
import useLoadMapboxGl from '../useLoadMapboxGl';
import { MapboxGl, MapboxMap } from '../types';

export interface MapProviderProps {
    apiKey: string;
    containerRef: RefObject<HTMLDivElement>;
    children?: ReactNode;
    center?: Point;
}

interface MapboxMapState {
    mapboxGl?: MapboxGl;
    map?: MapboxMap;
}

type Action = {
    type: 'setMap',
    data: MapboxMap,
} | {
    type: 'setMapboxGl',
    data: MapboxGl,
}

const mapReducer = (state: MapboxMapState, action: Action): MapboxMapState => {
    const { type, data } = action;
    switch (type) {
        case 'setMap':
            return {
                ...state,
                map: data,
            };
        case 'setMapboxGl':
            return {
                ...state,
                mapboxGl: data,
            };
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};

const MapContext = createContext<MapboxMapState|undefined>(undefined);

const MapboxProvider = ({
    children, containerRef, apiKey, center,
}: MapProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(mapReducer, { map: undefined, mapboxGl: undefined });

    const mapboxGl = useLoadMapboxGl(apiKey);

    useEffect(() => {
        if (!mapboxGl) {
            return;
        }
        dispatch({ type: 'setMapboxGl', data: mapboxGl });
    }, [mapboxGl, apiKey]);

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

export const useMapboxGl = (): MapboxGl|undefined => {
    const context = useContext(MapContext);

    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider');
    }

    return context.mapboxGl;
};

export const useMapboxMap = (): MapboxMap|undefined => {
    const context = useContext(MapContext);

    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider');
    }

    return context.map;
};

export default MapboxProvider;
