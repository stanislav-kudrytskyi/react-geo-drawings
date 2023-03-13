import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GOOGLE, MAPBOX, useProvider } from './MapProvider';
import GoogleMarker from '../google/Map/GoogleMarker';
import { Point } from '../index';
import MapboxMarker from '../mapbox/Map/MapboxMarker';

export interface MarkerProps {
    coordinates: Point;
    draggable?: boolean;
    onChange?: (coordinates: Point) => void;
    figureId?: string;
}

const Marker = ({
    coordinates, draggable, onChange, figureId,
}: MarkerProps): JSX.Element|null => {
    const provider = useProvider();
    const markerId = useMemo(() => figureId || uuidv4(), []);

    if (provider === GOOGLE) {
        return (
            <GoogleMarker
                key={markerId}
                draggable={draggable}
                coordinates={coordinates}
                onChange={onChange}
            />
        );
    }

    if (provider === MAPBOX) {
        return (
            <MapboxMarker
                key={markerId}
                draggable={draggable}
                coordinates={coordinates}
                onChange={onChange}
            />
        );
    }

    return null;
};

export default Marker;
