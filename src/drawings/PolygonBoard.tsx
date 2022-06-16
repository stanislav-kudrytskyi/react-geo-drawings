import React, {
    createContext,
    Dispatch,
    ReactNode,
    Reducer,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import { DEFAULT } from './constants';
import { PolygonDisplaySettings } from './Polygon';
import { Point } from '..';

type PolygonPayload = {
    polygonId: string;
    points: Point[];
    group?: string;
    meta?: {
        color?: string;
    };
    apiObject?: unknown;
}
type PolygonsMap = Map<string, Map<string, PolygonPayload>>
type Action = {
    type: 'polygonUpdate'|'polygonAdded';
    payload: PolygonPayload;
} | {
    type: 'setDisplaySettings';
    payload: PolygonDisplaySettings;
}
type PolygonsState = {
    addedPolygons: PolygonPayload[],
    polygons: PolygonsMap,
    displaySettings?: PolygonDisplaySettings,
};

interface PolygonContextState extends PolygonsState {
    dispatch: Dispatch<Action>
}

const PolygonContext = createContext<PolygonContextState|undefined>(undefined);

const polygonDefinitionReducer = (
    prevDefinition: PolygonsMap,
    payload: PolygonPayload,
): PolygonsMap => {
    const group = payload.group || DEFAULT;
    if (!prevDefinition.has(group)) {
        prevDefinition.set(group, new Map());
    }

    const polygonsGroup = prevDefinition.get(group);
    if (!payload.polygonId) {
        throw new Error('polygonId is missed');
    }
    if (!polygonsGroup?.has(payload.polygonId)) {
        (polygonsGroup as Map<string, PolygonPayload>).set(payload.polygonId, {
            group,
            polygonId: payload.polygonId,
            points: payload.points,
        });
    } else {
        const prevState = polygonsGroup.get(payload.polygonId);
        polygonsGroup.set(payload.polygonId, {
            ...prevState,
            group,
            polygonId: payload.polygonId,
            points: payload.points,
        });
    }
    return new Map(prevDefinition);
};

const polygonContextReducer: Reducer<PolygonsState, Action> = (state, { type, payload }) => {
    switch (type) {
        case 'polygonUpdate':
            return {
                ...state,
                polygons: polygonDefinitionReducer(state.polygons, payload),
            };
        case 'polygonAdded':
            return {
                ...state,
                polygons: polygonDefinitionReducer(state.polygons, payload),
                addedPolygons: [...state.addedPolygons, payload],
            };
        case 'setDisplaySettings':
            return { ...state, displaySettings: payload };
        default:
            throw new Error(`Unknown dispatch action: ${type}`);
    }
};
export const PolygonBoard = ({ children }: {children?: ReactNode}): JSX.Element => {
    const [polygonState, dispatch] = useReducer(polygonContextReducer, {
        polygons: new Map(),
        addedPolygons: [],
    });
    const [contextState, setContextState] = useState<PolygonContextState>({ dispatch } as PolygonContextState);

    useEffect(() => {
        setContextState({
            ...polygonState,
            dispatch,
        });
    }, [polygonState, dispatch]);

    return (
        <PolygonContext.Provider value={contextState}>
            {children || null}
        </PolygonContext.Provider>
    );
};

const usePolygonRegistryDispatch = () => {
    const context = useContext(PolygonContext);
    if (!context?.dispatch) {
        throw new Error('Wrong PolygonRegistry initialization');
    }

    return context?.dispatch;
};

export const usePolygonsData = (): PolygonsMap => {
    const context = useContext(PolygonContext);
    return context?.polygons || new Map();
};

export const useDispatchPolygonUpdated = () => {
    const dispatch = usePolygonRegistryDispatch();

    return useCallback((payload: PolygonPayload) => {
        dispatch({
            type: 'polygonUpdate',
            payload,
        });
    }, [dispatch]);
};
export const useDispatchPolygonAdded = () => {
    const dispatch = usePolygonRegistryDispatch();

    return useCallback((payload: PolygonPayload) => {
        dispatch({
            type: 'polygonAdded',
            payload,
        });
    }, [dispatch]);
};

export const useSetPolygonDisplaySettings = (displaySettings: PolygonDisplaySettings) => {
    const dispatch = usePolygonRegistryDispatch();
    dispatch({
        type: 'setDisplaySettings',
        payload: displaySettings,
    });
};
export const useAddedPolygons = (): PolygonPayload[] => {
    const context = useContext(PolygonContext);
    return context?.addedPolygons || [];
};
export const usePolygonDisplaySettings = (): PolygonDisplaySettings => {
    const context = useContext(PolygonContext);
    return context?.displaySettings as PolygonDisplaySettings;
};
