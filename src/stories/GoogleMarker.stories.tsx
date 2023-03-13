import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import React, { useCallback, useRef } from 'react';
import {
    GeoMap, MapProvider, Marker, Point,
} from '../index';

const kyiv: Point = { lat: 50.4501, lng: 30.5234 };

export default {
    title: 'GeoDrawing/Marker',
    component: Marker,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof Marker>;

const Template: ComponentStory<typeof Marker> = (args) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, updateArgs] = useArgs();

    const onCoordinatesChange = useCallback((point: Point) => {
        updateArgs({ coordinates: point });
    }, [updateArgs]);

    return (
        <MapProvider provider="google" apiKey="">
            <div style={{ height: '600px' }} ref={ref} id="map" />
            <GeoMap containerRef={ref} center={kyiv}>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Marker {...args} onChange={onCoordinatesChange} />
            </GeoMap>
        </MapProvider>
    );
};

export const GoogleMarker = Template.bind({});
GoogleMarker.storyName = 'google marker';
GoogleMarker.args = {
    draggable: true,
    coordinates: kyiv,
};
