import { useEffect } from 'react';
import { v4 } from 'uuid';
import { useContextMenu, useDrawingManger } from './MapContext';
import { useAddedPolygons, useDispatchPolygonAdded } from '../../drawings/PolygonBoard';
import { mvcToLatLong } from '../../utils';
import { Polygon } from '../..';
import { PolygonDisplaySettings } from '../../drawings/Polygon';

interface ControlBoardProps {
    addedPolygonDisplaySettings?: PolygonDisplaySettings;
}

const ControlBoard = ({ addedPolygonDisplaySettings }: ControlBoardProps): JSX.Element|null => {
    const drawingManager = useDrawingManger();
    const dispatch = useDispatchPolygonAdded();
    const contextMenu = useContextMenu();
    const addedPolygons = useAddedPolygons();
    useEffect(() => {
        let completeListener: google.maps.MapsEventListener|undefined;
        if (drawingManager) {
            completeListener = google.maps.event.addListener(
                drawingManager,
                'polygoncomplete',
                (polygon: google.maps.Polygon) => {
                    polygon.setEditable(true);
                    dispatch({
                        polygonId: v4(),
                        points: mvcToLatLong(polygon.getPath().getArray()),
                        apiObject: polygon,
                    });
                },
            );
        }
        return () => {
            if (completeListener) {
                google.maps.event.removeListener(completeListener);
            }
        };
    }, [drawingManager, contextMenu]);

    return addedPolygons.length ? (
        <>
            {addedPolygons.map((polygon) => (
                <Polygon
                    displaySettings={addedPolygonDisplaySettings}
                    key={polygon.polygonId}
                    apiObject={polygon.apiObject}
                    coordinates={polygon.points}
                    figureId={polygon.polygonId}
                    editable={(polygon.apiObject as google.maps.Polygon).getEditable()}
                />
            ))}
        </>
    ) : null;
};

export default ControlBoard;
