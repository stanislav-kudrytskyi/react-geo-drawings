import {
    useCallback, useEffect, useState,
} from 'react';
import { useContextMenu, useGoogleMap } from './MapContext';
import { mvcToLatLong } from '../../utils';
import { PolygonDisplaySettings } from '../../drawings/Polygon';
import { Point } from '../..';

export interface GooglePolygonProps {
    coordinates?: Point[];
    googlePolygon?: google.maps.Polygon;
    editable?: boolean;
    onChange?: (points: Point[], key?: string) => void;
    // eslint-disable-next-line react/no-unused-prop-types
    figureKey?: string;
    displaySettings?: PolygonDisplaySettings,
}

const GooglePolygon = ({
    coordinates, editable, onChange, googlePolygon, displaySettings,
}: GooglePolygonProps): null => {
    const map = useGoogleMap();
    const contextMenu = useContextMenu();
    const [polygon, setPolygon] = useState<google.maps.Polygon|undefined>(undefined);
    const [paths, setPaths] = useState<google.maps.MVCArray|undefined>(undefined);

    const onPolygonUpdate = useCallback(() => {
        if (!polygon) {
            return;
        }
        const points = mvcToLatLong(polygon?.getPath().getArray());
        if (onChange) {
            onChange(points);
        }
    }, [onChange, polygon]);

    useEffect(() => {
        if (googlePolygon) {
            setPolygon(googlePolygon);
            googlePolygon.setOptions({
                strokeColor: displaySettings?.borderColor,
                strokeOpacity: displaySettings?.borderOpacity,
                strokeWeight: displaySettings?.borderWidth,
                fillColor: displaySettings?.fillColor,
                fillOpacity: displaySettings?.fillOpacity,
            });
        } else if (!polygon) {
            const p = new google.maps.Polygon({
                paths: coordinates,
                strokeColor: displaySettings?.borderColor,
                strokeOpacity: displaySettings?.borderOpacity,
                strokeWeight: displaySettings?.borderWidth,
                fillColor: displaySettings?.fillColor,
                fillOpacity: displaySettings?.fillOpacity,
            });
            setPolygon(p);
        }

        return () => {
            if (polygon) {
                polygon.setMap(null);
            }
        };
    }, []);

    useEffect(() => {
        const insertLs = paths?.addListener('insert_at', onPolygonUpdate);
        const updateLs = paths?.addListener('set_at', onPolygonUpdate);
        const removeLs = paths?.addListener('remove_at', onPolygonUpdate);

        return () => {
            [insertLs, updateLs, removeLs].forEach((ls) => {
                if (ls) {
                    google.maps.event.removeListener(ls);
                }
            });
        };
    }, [paths, onPolygonUpdate]);

    useEffect(() => {
        if (!polygon) {
            return () => {};
        }
        let menuLs: google.maps.MapsEventListener|undefined;
        if (polygon) {
            menuLs = google.maps.event.addListener(polygon, 'contextmenu', (e: any) => {
                // Check if click was on a vertex control point
                if (e.vertex === undefined) {
                    return;
                }
                contextMenu!.open(polygon.getPath(), e.vertex);
            });
        }

        return () => {
            if (menuLs) {
                google.maps.event.removeListener(menuLs);
            }
        };
    }, [polygon]);

    useEffect(() => {
        if (polygon && map) {
            polygon.setMap(map);
            onPolygonUpdate();
        }
    }, [polygon, map]);

    useEffect(() => {
        polygon?.setEditable(editable || false);
    }, [polygon, editable]);

    useEffect(() => {
        polygon?.setOptions({
            strokeColor: displaySettings?.borderColor,
            strokeOpacity: displaySettings?.borderOpacity,
            strokeWeight: displaySettings?.borderWidth,
            fillColor: displaySettings?.fillColor,
            fillOpacity: displaySettings?.fillOpacity,
        });
    }, [displaySettings, polygon]);

    useEffect(() => {
        if (!polygon) {
            return;
        }
        polygon?.setOptions({ paths: coordinates });
        const newPath = polygon.getPath();
        setPaths(newPath);
    }, [polygon, coordinates]);

    return null;
};

export default GooglePolygon;
