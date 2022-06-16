import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PolygonExample from './PolygonExample';
import { GeoMap, MapProvider } from '../index';

export default {
    title: 'GeoDrawing/Polygon',
    component: GeoMap,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof GeoMap>;

const Template: ComponentStory<typeof GeoMap> = () => (
    <MapProvider provider="google" apiKey="">
        <PolygonExample />
    </MapProvider>
);

export const PolygonDemo = Template.bind({});
PolygonDemo.args = {};
