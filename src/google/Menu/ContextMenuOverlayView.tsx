import './context-menu.css';
import { createRoot, Root } from 'react-dom/client';

const POSITION = 'position';

export interface ContextMenu {
    open(
        position: google.maps.LatLng,
        items: JSX.Element
    ): void;
    close(): void;
}

export const contextMenuOverlayFactory = (map: google.maps.Map): ContextMenu => {
    class ContextMenuOverlayView extends google.maps.OverlayView implements ContextMenu {
        private readonly menuContainer: HTMLDivElement;

        private readonly menuRoot: Root;

        private readonly googleMap: google.maps.Map;

        private containerListener?: google.maps.MapsEventListener;

        constructor(googleMap: google.maps.Map) {
            super();
            this.googleMap = googleMap;
            this.menuContainer = document.createElement('div');
            this.menuContainer.className = 'delete-menu';
            this.menuRoot = createRoot(this.menuContainer);
        }

        onAdd = (): void => {
            const menu = this;
            const currentMap = this.getMap() as google.maps.Map;

            this.getPanes()!.floatPane.appendChild(this.menuContainer);

            // mousedown anywhere on the map except on the menu div will close the menu.
            this.containerListener = google.maps.event.addDomListener(
                currentMap.getDiv(),
                'mousedown',
                (e: Event) => {
                    if (!menu.menuContainer.contains(e.target as Node)) {
                        menu.close();
                    }
                },
                true,
            );
        };

        onRemove = (): void => {
            if (this.containerListener) {
                google.maps.event.removeListener(this.containerListener);
            }

            (this.menuContainer.parentNode as HTMLElement).removeChild(this.menuContainer);

            this.set(POSITION, null);
        };

        close = (): void => {
            this.setMap(null);
        };

        draw = (): void => {
            const position = this.get(POSITION);
            const projection = this.getProjection();

            if (!position || !projection) {
                return;
            }

            const point = projection.fromLatLngToDivPixel(position)!;
            this.menuContainer.style.top = `${point.y}px`;
            this.menuContainer.style.left = `${point.x}px`;
        };

        open = (
            position: google.maps.LatLng,
            items: JSX.Element,
        ): void => {
            this.set(POSITION, position);
            this.setMap(this.googleMap);
            this.menuRoot.render(items);
            this.draw();
        };
    }

    return new ContextMenuOverlayView(map);
};
