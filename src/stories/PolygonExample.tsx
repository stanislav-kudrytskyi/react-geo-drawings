import React, { useEffect, useRef, useState } from 'react';
import {
    Polygon, GeoMap, usePolygonsUpdates, Point,
} from '..';

const kyiv: Point = { lat: 50.4501, lng: 30.5234 };
const berlin: Point = { lat: 52.5200, lng: 13.4050 };
const bengaluru: Point = { lat: 12.9716, lng: 77.5946 };

const inKyiv: Point[] = [
    { lat: 51.4501, lng: 29.5234 }, { lat: 49.4501, lng: 29.5234 }, { lat: 49.4501, lng: 31.5234 },
];
const inBerlin: Point[] = [
    { lat: 52.8200, lng: 13.0050 }, { lat: 52.1200, lng: 13.0050 }, { lat: 52.1200, lng: 13.8050 },
];
const inBengaluru: Point[] = [
    { lat: 12.99, lng: 77.1946 }, { lat: 12.99, lng: 77.9946 }, { lat: 12.5716, lng: 77.9946 },
];

const colours = [
    { label: 'red', value: '#900' },
    { label: 'green', value: '#070' },
    { label: 'blue', value: '#00F' },
];

const KYIV = 'kyiv';
const BERLIN = 'berlin';
const BENGALURU = 'bengaluru';

const cities = [KYIV, BERLIN, BENGALURU];

const citiesMap = {
    [KYIV]: { center: kyiv, coords: inKyiv },
    [BERLIN]: { center: berlin, coords: inBerlin },
    [BENGALURU]: { center: bengaluru, coords: inBengaluru },
};

const cssInlineBlock = {
    display: 'inline-block', width: '49%', verticalAlign: 'top', margin: '4px',
};
const cssInput = { width: '200px', borderWidth: 1 };

const PolygonExample = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [coordinates, setCoordinates] = useState(inKyiv);
    const [center, setCenter] = useState<Point>(kyiv);
    const [colour, setColour] = useState<string>(colours[0].value);
    const [zoom, setZoom] = useState<number>(5);
    const [opacity, setOpacity] = useState<number>(0.7);
    return (
        <div>
            <div style={cssInlineBlock}>
                <div style={cssInlineBlock}>Center</div>
                <div style={cssInlineBlock}>
                    <select
                        style={cssInput}
                        onChange={(event) => {
                        // @ts-ignore
                            setCenter(citiesMap[event.target.value].center as Point);
                        }}
                    >
                        {cities.map((name) => (
                            <option
                                key={name}
                                value={name}
                            >
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={cssInlineBlock}>Zoom</div>
                <div style={cssInlineBlock}>
                    <input
                        style={cssInput}
                        type="number"
                        value={zoom}
                        onChange={(e) => {
                            setZoom(Number(e.target.value));
                        }}
                    />
                </div>
                <div style={cssInlineBlock}>Colour</div>
                <div style={cssInlineBlock}>
                    <select
                        style={cssInput}
                        value={colour}
                        onChange={(event) => {
                            setColour(event.target.value);
                        }}
                    >
                        {colours.map(({ label, value }) => (
                            <option
                                key={value}
                                value={value}
                            >
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={cssInlineBlock}>Opacity</div>
                <div style={cssInlineBlock}>
                    <input
                        type="number"
                        style={cssInput}
                        min={0}
                        max={1}
                        step={0.1}
                        value={opacity}
                        onChange={(e) => {
                            setOpacity(Number(e.target.value));
                        }}
                    />
                </div>
                <div style={cssInlineBlock}>Coordinates</div>
                <div style={cssInlineBlock}>
                    <select
                        style={cssInput}
                        onChange={(event) => {
                            // @ts-ignore
                            setCoordinates(citiesMap[event.target.value].coords as Point[]);
                        }}
                    >
                        {cities.map((name) => (
                            <option
                                key={name}
                                value={name}
                            >
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div style={{ display: 'inline-block', width: '50%' }}>
                <div style={{ height: '600px' }} ref={ref} id="map" />
                <GeoMap
                    containerRef={ref}
                    center={center}
                    minZoom={3}
                    zoom={zoom}
                    onZoomChange={(z) => setZoom(z || 0)}
                >
                    <Polygon
                        coordinates={coordinates}
                        displaySettings={{
                            fillColor: colour,
                            fillOpacity: opacity,
                        }}
                        editable
                    />
                </GeoMap>
            </div>
        </div>
    );
};

export default PolygonExample;
