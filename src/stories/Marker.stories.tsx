import React from 'react';
import {
    Meta, StoryObj, Decorator, StoryFn,
} from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Marker, Point } from '../index';
import { berlin, kyiv } from './constants';
import {
    MapDecorator,
    mapProviderDecoratorFactory,
} from './MapProviderDecorator';
import { Provider } from '../drawings/MapProvider';

const meta = {
    title: 'Drawings/Marker',
    component: Marker,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as Meta<typeof Marker>;

export default meta;

type Story = StoryObj<typeof Marker>;

const MarkerDecorator: Decorator = (Story: StoryFn, ctx) => {
    const [, updateArgs] = useArgs();
    // eslint-disable-next-line react/destructuring-assignment
    ctx.args.onChange = (coordinates: Point) => {
        updateArgs({ coordinates });
    };
    return <Story />;
};

const markerStoryFactory = (provider: Provider): Story => ({
    args: {
        draggable: true,
        coordinates: berlin,
    },
    decorators: [
        MarkerDecorator,
        MapDecorator,
        mapProviderDecoratorFactory(provider),
    ],
});

export const GoogleMarkerStory: Story = markerStoryFactory('google');
export const MapboxMarkerStory: Story = markerStoryFactory('mapbox');
