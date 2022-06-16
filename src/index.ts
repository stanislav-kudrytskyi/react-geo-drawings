import { MapProvider } from './drawings/MapProvider';
import GeoMap from './drawings/GeoMap';
import Polygon from './drawings/Polygon';
import Marker from './drawings/Marker';
import usePolygonsUpdates from './drawings/usePolygonsUpdates';

export type Point = {
    lat: number;
    lng: number;
}

export {
    MapProvider,
    GeoMap,
    Polygon,
    Marker,
    usePolygonsUpdates,
};
