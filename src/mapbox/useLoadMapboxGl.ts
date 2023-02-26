import { useEffect, useState } from 'react';
import { MapboxGl } from './types';

const useLoadMapboxGl = (apiKey: string): MapboxGl|undefined => {
    const [mapboxGl, setMapboxGl] = useState<MapboxGl>();

    useEffect(() => {
        const load = async () => Promise.all([
            import('mapbox-gl'),
            // @ts-ignore
            import('mapbox-gl/dist/mapbox-gl.css'),
        ]).then(([lib]) => {
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            lib.default.accessToken = apiKey; // Set the access token on the lib object
            // @ts-ignore
            setMapboxGl(lib.default); // Set the mapboxGl state to the lib object
        });
        load().catch(() => {
            throw new Error('mapbox-gl library is not installed. Please check installation instructions:'
                + ' https://docs.mapbox.com/mapbox-gl-js/guides/install/');
        });
    }, []);

    return mapboxGl;
};

export default useLoadMapboxGl;
