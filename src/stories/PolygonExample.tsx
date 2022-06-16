import React, { useEffect, useRef, useState } from 'react';
import {
    Polygon, GeoMap, usePolygonsUpdates, Point,
} from '..';

type PolygonConfig = {name: string, coords: Point[]};
const initPolygons: PolygonConfig[] = [
    {
        name: 'random1',
        coords: [
            { lat: 48.774, lng: 54.0 },
            { lat: 48.466, lng: 57.118 },
            { lat: 47.0, lng: 54.0 },
        ],
    },
    {
        name: 'random2',
        coords: [
            { lat: 45.5, lng: 50.0 },
            { lat: 46.466, lng: 51.118 },
            { lat: 45.0, lng: 51.0 },
        ],
    },
];

const PolygonExample = () => {
    const ref = useRef<HTMLDivElement>(null);
    const polygonCoordinates = usePolygonsUpdates();
    const [polygons, setPolygons] = useState<PolygonConfig[]>(initPolygons);
    useEffect(() => {
        const ts = setTimeout(() => {
            setPolygons((prev) => {
                if (prev.find((p) => p.name === 'delayedPolygon')) {
                    return prev;
                }
                return [...prev, {
                    name: 'delayedPolygon',
                    coords: [
                        {
                            lat: 49.217954596794996,
                            lng: 44.47273632812501,
                        },
                        {
                            lat: 52.248318068651045,
                            lng: 47.37312695312501,
                        },
                        {
                            lat: 49.24665060861438,
                            lng: 51.19636914062501,
                        },
                    ],
                }];
            });
        }, 3000);

        return () => {
            clearTimeout(ts);
        };
    }, []);

    return (
        <div>
            <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                <textarea
                    style={{ width: 500, height: 500 }}
                    value={JSON.stringify(polygonCoordinates, null, 2)}
                    readOnly
                />
            </div>
            <div style={{ display: 'inline-block', width: '50%' }}>
                <div style={{ height: '600px' }} ref={ref} id="map" />
                <GeoMap containerRef={ref}>
                    {polygons.map(({ name, coords }) => (
                        <Polygon
                            key={name}
                            coordinates={coords}
                            editable
                            figureId={name}
                        />
                    ))}
                </GeoMap>
            </div>
        </div>
    );
};

export default PolygonExample;
