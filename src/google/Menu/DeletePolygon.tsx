import { useCallback } from 'react';
import MenuItem from './MenuItem';

interface DeletePolygonProps {
    label: string;
    onDelete: () => void,
    close: () => void;
}
const DeletePolygon = ({ onDelete, close, label }: DeletePolygonProps): JSX.Element => {
    const removePolygon = useCallback(() => {
        onDelete();
        close();
    }, [onDelete, close]);

    return <MenuItem label={label} onClick={removePolygon} />;
};

export default DeletePolygon;
