import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useRef } from 'react';
import { useGlobals } from '@storybook/client-api';
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
    console.log(args);

    const globals = useGlobals();
    console.log(globals);
    return (
        // @ts-ignore
        // eslint-disable-next-line react/destructuring-assignment
        <MapProvider provider="google" apiKey={args.googleApiKey || ''}>
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
