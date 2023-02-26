export interface MapboxMap {}

export interface MapboxMapOptions {
    container: string | HTMLElement;
    style: string;
    zoom: number;
    center: [lng: number, lat: number]
}

export interface MapboxGlMarker {
    setLngLat(center: [lng: number, lat: number]): void;
    addTo(map: MapboxMap): void;
    setDraggable(draggable: boolean): void;
    on(event: string, callback: () => void): void;
    getLngLat(): {lat: number, lng: number};
}

interface MapConstructor {
    new (opts: MapboxMapOptions): MapboxMap
}

interface MarkerConstructor {
    new (): MapboxGlMarker;
}

export interface MapboxGl {
    accessToken: string;
    Map: MapConstructor;
    Marker: MarkerConstructor
}
