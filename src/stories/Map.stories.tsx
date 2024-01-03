import { Decorator, Meta, StoryObj } from '@storybook/react';
import {
    GeoMap, Point,
} from '../index';
import {
    GoogleMapProviderDecorator,
    MapboxMapProviderDecorator,
    mapProviderDecoratorFactory,
} from './MapProviderDecorator';
import { Provider } from '../drawings/MapProvider';
import { kyiv } from './constants';

const meta = {
    title: 'Drawings/Map',
    component: GeoMap,
} as Meta<typeof GeoMap>;

export default meta;

const buildCodeSnippet = (provider: Provider) => `
import {MapProvider, GeoMap, Point} from 'react-geo-drawings';

const App = () => {
    const ref = useRef<HTMLDivElement>(null);
    const kyiv: Point = { lat: 50.4501, lng: 30.5234 };
     
    return <MapProvider provider='${provider}' apiKey='YOUR_API_KEY'>
            <div style={{ height: '600px' }} ref={ref} id="map" />
            <GeoMap 
                containerRef={ref}
                center={kyiv} 
            />
        </MapProvider>
    ;
};
    `;

type Story = StoryObj<typeof GeoMap>;

const mapStoryFactory = (provider: Provider): Story => ({
    args: {
        center: kyiv,
    },
    parameters: {
        docs: {
            source: {
                code: buildCodeSnippet(provider),
                language: 'tsx',
            },
        },
    },
    decorators: [mapProviderDecoratorFactory(provider)],
});

export const GoogleGeoMapStory: Story = mapStoryFactory('google');
export const MapboxGeoMapStory: Story = mapStoryFactory('mapbox');
