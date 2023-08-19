import { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import {
    GeoMap, MapProvider, Point,
} from '../index';
import { GeoMapProps } from '../drawings/GeoMap';

const kyiv: Point = { lat: 50.4501, lng: 30.5234 };

const WarmedGeoMap = (args: Pick<GeoMapProps, 'center'|'zoom'|'minZoom'>) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <MapProvider provider="google" apiKey="">
            <div style={{ height: '600px' }} ref={ref} id="map" />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <GeoMap {...args} containerRef={ref} />
        </MapProvider>
    );
};

export default {
    title: 'GeoDrawing/GeoMap',
    component: GeoMap,
    args: {
        center: kyiv,
    },
    render: ({ center, zoom, minZoom }) => (
        <WarmedGeoMap
            center={center}
            zoom={zoom}
            minZoom={minZoom}
        />
    ),
} as Meta<typeof GeoMap>;

export const GeoMapStory: StoryObj<typeof GeoMap> = {
};
