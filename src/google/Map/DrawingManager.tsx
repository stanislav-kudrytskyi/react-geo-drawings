import { useEffect, useMemo } from 'react';
import { useGoogleMap } from './MapContext';
import { DrawingMode } from '../../drawings/constants';

interface DrawingManagerProps {
    onInit: (drawingManager: google.maps.drawing.DrawingManager) => void;
    modes?: DrawingMode[];
}

const DrawingManager = ({ onInit, modes }: DrawingManagerProps): JSX.Element|null => {
    const map = useGoogleMap();
    const drawingManager = useMemo(() => new google.maps.drawing.DrawingManager({
        drawingMode: null,
    }), []);

    const defaultDrawingControlOptions = useMemo<google.maps.drawing.DrawingControlOptions|null>(() => {
        if (!map) {
            return null;
        }

        return {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: null,
        };
    }, [map]);

    const drawingModes = useMemo(() => {
        if (!modes) {
            return null;
        }
        const modesMap = {
            [DrawingMode.NONE]: null,
            [DrawingMode.POLYGON]: google.maps.drawing.OverlayType.POLYGON,
        };

        const mappedModes = modes
            .filter((mode) => !!mode)
            .map((mode) => modesMap[mode]);

        return mappedModes as google.maps.drawing.OverlayType[];
    }, [modes]);

    useEffect(() => {
        if (!drawingManager) {
            return;
        }

        drawingManager.setOptions({
            drawingControlOptions: {
                ...defaultDrawingControlOptions,
                drawingModes,
            },
            drawingControl: !!drawingModes?.length,
        });
    }, [drawingManager, drawingModes, defaultDrawingControlOptions]);

    useEffect(() => {
        if (drawingManager && map) {
            drawingManager.setMap(map);
            onInit(drawingManager);
        }
    }, [drawingManager, map]);

    return null;
};

export default DrawingManager;
