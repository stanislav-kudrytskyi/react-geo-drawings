import React, { useRef } from 'react';
import {
    GeoMap, Marker, Point,
} from '..';

const kyiv: Point = { lat: 50.4501, lng: 30.5234 };

const MarkerExample = () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div>
            <div style={{ height: '600px' }} ref={ref} id="map" />
            <GeoMap containerRef={ref} center={kyiv}>
                <Marker
                    coordinates={kyiv}
                    draggable
                    onChange={(point) => {
                        console.info('Marker position changed:', point);
                    }}
                />
            </GeoMap>
        </div>
    );
};

export default MarkerExample;
