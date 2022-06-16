import { GOOGLE, MAPBOX, useProvider } from './MapProvider';
import GoogleMarker from '../google/Map/GoogleMarker';
import { Point } from '../index';
import MapboxMarker from '../mapbox/Map/MapboxMarker';

export interface MarkerProps {
    coordinates: Point;
    draggable?: boolean;
    onChange?: (coordinates: Point) => void;
}

const Marker = ({ coordinates, draggable, onChange }: MarkerProps): JSX.Element|null => {
    const provider = useProvider();

    if (provider === GOOGLE) {
        return (
            <GoogleMarker
                draggable={draggable}
                coordinates={coordinates}
                onChange={onChange}
            />
        );
    }

    if (provider === MAPBOX) {
        return (
            <MapboxMarker
                draggable={draggable}
                coordinates={coordinates}
                onChange={onChange}
            />
        );
    }

    return null;
};

export default Marker;
