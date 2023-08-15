import React, { useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GOOGLE, useProvider } from './MapProvider';
import GooglePolygon from '../google/Map/GooglePolygon';
import { useDispatchPolygonDeleted, useDispatchPolygonUpdated } from './PolygonBoard';
import { usePolygonDisplaySettings } from './DisplaySettingsProvider';
import { Point } from '..';

export interface PolygonDisplaySettings {
    fillColor?: string;
    fillOpacity?: number;
    borderColor?: string;
    borderOpacity?: number;
    borderWidth?: number;
}

export interface PolygonProps {
    coordinates?: Point[];
    editable?: boolean;
    removable?: boolean;
    onChange?: (points: Point[], key?: string) => void;
    // eslint-disable-next-line react/no-unused-prop-types
    figureId?: string;
    displaySettings?: PolygonDisplaySettings;
    apiObject?: unknown;
}

const Polygon = ({
    coordinates, editable, removable, onChange, figureId, displaySettings, apiObject,
}: PolygonProps): JSX.Element|null => {
    const provider = useProvider();
    const dispatchPolygonUpdate = useDispatchPolygonUpdated();
    const dispatchPolygonDeleted = useDispatchPolygonDeleted();
    const polygonId = useMemo(() => figureId || uuidv4(), []);
    const defaultDisplaySettings = usePolygonDisplaySettings();

    const polygonOnChange = useCallback((points: Point[], key?: string) => {
        dispatchPolygonUpdate({
            polygonId,
            points,
        });
        if (!onChange) {
            return;
        }
        onChange(points, key);
    }, [polygonId, onChange, dispatchPolygonUpdate]);

    const polygonOnDelete = useCallback(() => {
        dispatchPolygonDeleted({ polygonId, points: [] });
    }, [dispatchPolygonDeleted, polygonId]);

    if (provider === GOOGLE) {
        return (
            <GooglePolygon
                key={polygonId}
                coordinates={coordinates}
                editable={editable}
                onChange={polygonOnChange}
                onDelete={removable ? polygonOnDelete : undefined}
                displaySettings={{ ...defaultDisplaySettings, ...displaySettings }}
                googlePolygon={apiObject as google.maps.Polygon}
            />
        );
    }

    return null;
};

export default Polygon;
