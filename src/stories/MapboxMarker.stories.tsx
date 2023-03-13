import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GeoMap, MapProvider } from '../index';
import MarkerExample from './MarkerExample';

export default {
    title: 'GeoDrawing/Marker/Mapbox',
    component: GeoMap,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<any>;

const Template: ComponentStory<any> = () => (
    <MapProvider
        provider="mapbox"
        apiKey=""
    >
        <MarkerExample />
    </MapProvider>
);

export const Mapbox = Template.bind({});
Mapbox.args = {};
