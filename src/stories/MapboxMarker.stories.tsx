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
        apiKey="pk.eyJ1Ijoia2FuZ2Fyb293aWxkIiwiYSI6ImNsY2oyMGFjejBkdDMzb3Foa3lqYmJwZ2IifQ.yEFTVQImZwkjIxS7JwvZbA"
    >
        <MarkerExample />
    </MapProvider>
);

export const Mapbox = Template.bind({});
Mapbox.args = {};
