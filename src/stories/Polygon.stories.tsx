import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GeoMap, MapProvider } from '../index';
import MultiplePolygonExample from './MultiplePolygonsExample';

export default {
    title: 'GeoDrawing/Polygon/Multiple',
    component: GeoMap,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof GeoMap>;

const Template: ComponentStory<typeof GeoMap> = () => (
    <MapProvider provider="google" apiKey="">
        <MultiplePolygonExample />
    </MapProvider>
);

export const PolygonDemo = Template.bind({});
PolygonDemo.args = {};
