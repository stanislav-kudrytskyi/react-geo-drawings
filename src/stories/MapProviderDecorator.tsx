import {
    Decorator, StoryContext, StoryFn,
} from '@storybook/react';
import React, { RefObject, useRef } from 'react';
import { MapProvider, Provider } from '../drawings/MapProvider';
import { GeoMap } from '../index';
import { kyiv } from './constants';

const MapProviderDecorator = (Story: StoryFn, ctx: StoryContext, provider :Provider, apiKey: string) => {
    const ref = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line react/destructuring-assignment
    ctx.args.containerRef = ref;
    return (
        <MapProvider provider={provider} apiKey={apiKey}>
            <div style={{ height: '600px' }} ref={ref} id="map" />
            <Story />
        </MapProvider>
    );
};

export const GoogleMapProviderDecorator: Decorator = (Story: StoryFn, ctx) => {
    // @ts-ignore
    const apiKey = import.meta.env.STORYBOOK_GOOGLE_API_KEY;
    return MapProviderDecorator(Story, ctx, 'google', apiKey);
};

export const MapboxMapProviderDecorator: Decorator = (Story: StoryFn, ctx) => {
    // @ts-ignore
    const apiKey = import.meta.env.STORYBOOK_MAPBOX_API_KEY;
    return MapProviderDecorator(Story, ctx, 'mapbox', apiKey);
};

export const MapDecorator: Decorator = (Story: StoryFn, ctx) => {
    // eslint-disable-next-line react/destructuring-assignment
    const { containerRef } = ctx.args;
    return (
        <GeoMap containerRef={containerRef as RefObject<HTMLDivElement>} center={kyiv}>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {Story(ctx.args, ctx)}
        </GeoMap>
    );
};

export const mapProviderDecoratorFactory = (provider: Provider): Decorator => {
    switch (provider) {
        case 'google':
            return GoogleMapProviderDecorator;
        case 'mapbox':
            return MapboxMapProviderDecorator;
        default:
            throw new Error(`Unsupported provider ${provider}`);
    }
};
