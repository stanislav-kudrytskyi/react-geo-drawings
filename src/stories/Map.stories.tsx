import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useRef } from 'react';
import {
    GeoMap, MapProvider, Point,
} from '../index';

const kyiv: Point = { lat: 50.4501, lng: 30.5234 };

export default {
    title: 'GeoDrawing/GeoMap',
    component: GeoMap,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof GeoMap>;

const Template: ComponentStory<typeof GeoMap> = (args) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <MapProvider provider="google" apiKey="">
            <div style={{ height: '600px' }} ref={ref} id="map" />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <GeoMap {...args} containerRef={ref} />
        </MapProvider>
    );
};

export const GoogleMap = Template.bind({});
GoogleMap.storyName = 'Google Map';
GoogleMap.args = {
    center: kyiv,
};
