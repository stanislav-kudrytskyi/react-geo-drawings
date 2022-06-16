import {
    createContext, ReactNode, useContext, useMemo, useState,
} from 'react';
import { PolygonDisplaySettings } from './Polygon';

interface DisplaySettings {
    polygon?: PolygonDisplaySettings;

    setPolygonSettings?: (settings: PolygonDisplaySettings) => void;
}

const DisplaySettingsContext = createContext<DisplaySettings>({});
export const DisplaySettingsProvider = ({ children }: {children?: ReactNode}): JSX.Element => {
    const [polygonSettings, setPolygonSettings] = useState<PolygonDisplaySettings>({
        borderColor: '#FF0000',
        borderOpacity: 0.8,
        borderWidth: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
    });

    const context = useMemo<DisplaySettings>(() => ({
        polygon: polygonSettings,
        setPolygonSettings,
    }), [polygonSettings]);

    return (
        <DisplaySettingsContext.Provider value={context}>
            {children}
        </DisplaySettingsContext.Provider>
    );
};

export const useSetPolygonDisplaySettings = (displaySettings: PolygonDisplaySettings) => {
    const context = useContext(DisplaySettingsContext);
    if (!context?.setPolygonSettings || !context?.polygon) {
        return;
    }
    context.setPolygonSettings(displaySettings);
};

export const usePolygonDisplaySettings = () => {
    const context = useContext(DisplaySettingsContext);
    return context?.polygon;
};
