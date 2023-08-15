import { useCallback } from 'react';
import MenuItem from './MenuItem';

interface DeleteVertexProps {
    path: google.maps.MVCArray<google.maps.LatLng>;
    label: string;
    vertexIndex: number;
    close: () => void;
}
const DeleteVertex = ({
    path, vertexIndex, close, label,
}: DeleteVertexProps): JSX.Element => {
    const removeVertex = useCallback(() => {
        if (!path || vertexIndex === undefined) {
            close();
            return;
        }
        path.removeAt(vertexIndex);
        close();
    }, [path, vertexIndex, close]);

    return <MenuItem label={label} onClick={removeVertex} />;
};

export default DeleteVertex;
