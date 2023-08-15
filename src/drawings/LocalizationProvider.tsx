import {
    createContext, ReactNode, useContext, useMemo,
} from 'react';

export enum Terms {
    DELETE_VERTEX,
    DELETE_POLYGON,
}

type LocalizationMap = {[key in Terms]: string};
export type Localization = Partial<LocalizationMap>;

const defaults: LocalizationMap = {
    [Terms.DELETE_POLYGON]: 'Delete polygon',
    [Terms.DELETE_VERTEX]: 'Delete point',
};

const LocalizationContext = createContext<LocalizationMap>(defaults);

interface LocalizationProviderProps {
    children?: ReactNode;
    localization?: Localization;
}

export const LocalizationProvider = ({ children, localization }: LocalizationProviderProps): JSX.Element => {
    const value = useMemo(() => {
        if (!localization) {
            return defaults;
        }
        return { ...defaults, ...localization };
    }, [localization]);

    return (
        <LocalizationContext.Provider value={value}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useGetLocalisedLabel = (): (key: Terms) => string => {
    const context = useContext(LocalizationContext);

    return (key: Terms): string => context[key];
};
