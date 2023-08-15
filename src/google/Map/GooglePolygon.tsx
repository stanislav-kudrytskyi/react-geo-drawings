import {
    useCallback, useEffect, useMemo, useState,
} from 'react';
import { useContextMenu, useGoogleMap } from './MapContext';
import { mvcToLatLong } from '../../utils';
import { PolygonDisplaySettings } from '../../drawings/Polygon';
import { Point } from '../..';
import DeleteVertex from '../Menu/DeleteVertex';
import DeletePolygon from '../Menu/DeletePolygon';
import { Terms, useGetLocalisedLabel } from '../../drawings/LocalizationProvider';

export interface GooglePolygonProps {
    coordinates?: Point[];
    googlePolygon?: google.maps.Polygon;
    editable?: boolean;
    onChange?: (points: Point[], key?: string) => void;
    onDelete?: () => void;
    // eslint-disable-next-line react/no-unused-prop-types
    figureKey?: string;
    displaySettings?: PolygonDisplaySettings,
}

const GooglePolygon = ({
    coordinates, editable, onChange, googlePolygon, displaySettings, onDelete,
}: GooglePolygonProps): null => {
    const map = useGoogleMap();
    const contextMenu = useContextMenu();
    const [polygon, setPolygon] = useState<google.maps.Polygon|undefined>(undefined);
    const [paths, setPaths] = useState<google.maps.MVCArray|undefined>(undefined);
    const getLabel = useGetLocalisedLabel();
    const onPolygonUpdate = useCallback(() => {
        if (!polygon) {
            return;
        }
        const points = mvcToLatLong(polygon?.getPath().getArray());
        if (onChange) {
            onChange(points);
        }
    }, [onChange, polygon]);

    const onDeletePolygon = useMemo(() => {
        if (!onDelete || !polygon) {
            return undefined;
        }
        return () => {
            polygon.setMap(null);
            onDelete();
        };
    }, [onDelete, polygon]);

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
                if (e.vertex !== undefined) {
                    contextMenu!.open(
                        polygon.getPath().getAt(e.vertex),
                        <DeleteVertex
                            path={polygon.getPath()}
                            label={getLabel(Terms.DELETE_VERTEX)}
                            vertexIndex={e.vertex}
                            close={contextMenu!.close}
                        />,
                    );
                    return;
                }
                if (e.latLng && onDeletePolygon) {
                    contextMenu!.open(
                        e.latLng,
                        <DeletePolygon
                            label={getLabel(Terms.DELETE_POLYGON)}
                            onDelete={onDeletePolygon}
                            close={contextMenu!.close}
                        />,
                    );
                }
            });
        }

        return () => {
            if (menuLs) {
                google.maps.event.removeListener(menuLs);
            }
        };
    }, [polygon, onDeletePolygon, getLabel]);

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
