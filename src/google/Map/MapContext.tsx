import React, {
    createContext, ReactNode, useContext, useReducer,
} from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import Map, { MapProps } from './Map';
import DrawingManager from './DrawingManager';
import ControlBoard from './ControlBoard';
import { ContextMenu, contextMenuOverlayFactory } from '../Menu/ContextMenuOverlayView';
import { PolygonDisplaySettings } from '../../drawings/Polygon';

export interface MapProviderProps extends Omit<MapProps, 'onInit'> {
    children?: ReactNode;
    googleApiKey?: string;
    addedPolygonDisplaySettings?: PolygonDisplaySettings;
}

interface GoogleMapState {
    map?: google.maps.Map;
    drawingManager?: google.maps.drawing.DrawingManager;
    contextMenu?: ContextMenu;
}
type Action = {
    type: 'setMap',
    data: google.maps.Map
} | {
    type: 'setDrawingManager',
    data: google.maps.drawing.DrawingManager
}
const GoogleMapContext = createContext<GoogleMapState|undefined>(undefined);

const mapReducer = (state: GoogleMapState, action: Action): GoogleMapState => {
    const { type, data } = action;
    switch (type) {
        case 'setMap':
            return {
                ...state,
                map: data,
                contextMenu: contextMenuOverlayFactory(data),
            };
        case 'setDrawingManager':
            return { ...state, drawingManager: data };
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};

const render = (status: Status) => <h1>{status}</h1>;

export const GoogleMapProvider = ({
    children, googleApiKey, containerRef, center, minZoom, addedPolygonDisplaySettings, zoom, onZoomChange,
}: MapProviderProps) => {
    const [state, dispatch] = useReducer(mapReducer, { map: undefined });
    return (
        <Wrapper apiKey={googleApiKey || ''} render={render} libraries={['drawing']}>
            <GoogleMapContext.Provider value={state}>
                <Map
                    containerRef={containerRef}
                    onInit={(map) => dispatch({ type: 'setMap', data: map })}
                    center={center}
                    minZoom={minZoom}
                    zoom={zoom}
                    onZoomChange={onZoomChange}
                />
                <DrawingManager
                    onInit={(drawingManager) => dispatch({ type: 'setDrawingManager', data: drawingManager })}
                />
                <ControlBoard addedPolygonDisplaySettings={addedPolygonDisplaySettings} />
                {children || null}
            </GoogleMapContext.Provider>
        </Wrapper>
    );
};

GoogleMapProvider.defaultProps = {
    children: undefined,
    googleApiKey: '',
};

export const useContextMenu = (): ContextMenu|undefined => {
    const context = useContext(GoogleMapContext);

    if (context === undefined) {
        throw new Error('useContextMenu must be used within a MapProvider');
    }

    return context.contextMenu;
};

export const useGoogleMap = (): google.maps.Map|undefined => {
    const context = useContext(GoogleMapContext);

    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider');
    }

    return context.map;
};

export const useDrawingManger = (): google.maps.drawing.DrawingManager|undefined => {
    const context = useContext(GoogleMapContext);

    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider');
    }

    return context.drawingManager;
};
