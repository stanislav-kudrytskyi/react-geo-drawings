import { useMemo } from 'react';
import { usePolygonsData } from './PolygonBoard';
import { DEFAULT } from './constants';
import { Point } from '../index';

interface PolygonResponse {
    points: Point[];
    id: string;
}
const usePolygonsUpdates = (group: string = DEFAULT) => {
    const polygonsData = usePolygonsData();
    return useMemo(() => {
        const response: PolygonResponse[] = [];
        if (group) {
            const polygonsGroup = polygonsData.get(group);

            if (!polygonsGroup) {
                return [];
            }
            polygonsGroup.forEach(({ points, polygonId }) => {
                response.push({
                    points,
                    id: polygonId,
                });
            });
            return response;
        }

        polygonsData.forEach((polygonsGroup) => {
            polygonsGroup.forEach(({ points, polygonId }) => {
                response.push({
                    points,
                    id: polygonId,
                });
            });
        });
        return response;
    }, [polygonsData, group]);
};

export default usePolygonsUpdates;
