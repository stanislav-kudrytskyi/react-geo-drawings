import { useEffect, useMemo } from 'react';
import { useGoogleMap } from './MapContext';

interface DrawingManagerProps {
    onInit: (drawingManager: google.maps.drawing.DrawingManager) => void;
}

const DrawingManager = ({ onInit }: DrawingManagerProps): JSX.Element|null => {
    const map = useGoogleMap();
    const drawingManager = useMemo(() => new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.POLYGON,
            ],
        },
    }), []);
    useEffect(() => {
        if (drawingManager && map) {
            drawingManager.setMap(map);
            onInit(drawingManager);
        }
    }, [drawingManager, map]);

    return null;
};

export default DrawingManager;
