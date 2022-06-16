import './context-menu.css';

const POSITION = 'position';
const PATH = 'path';
const VERTEX_INDEX = 'vertex';

export interface ContextMenu {
    open(
        path: google.maps.MVCArray<google.maps.LatLng>,
        vertex: number
    ): void
}

export const contextMenuOverlayFactory = (map: google.maps.Map): ContextMenu => {
    class ContextMenuOverlayView extends google.maps.OverlayView implements ContextMenu {
        private readonly menuContainer: HTMLDivElement;

        private readonly googleMap: google.maps.Map;

        private containerListener?: google.maps.MapsEventListener;

        constructor(googleMap: google.maps.Map) {
            super();
            this.googleMap = googleMap;
            this.menuContainer = document.createElement('div');
            this.menuContainer.className = 'delete-menu';
            this.menuContainer.innerHTML = 'Delete vertex';

            const menu = this;

            google.maps.event.addDomListener(this.menuContainer, 'click', () => {
                menu.removeVertex();
            });
        }

        onAdd() {
            const deleteMenu = this;
            const currentMap = this.getMap() as google.maps.Map;

            this.getPanes()!.floatPane.appendChild(this.menuContainer);

            // mousedown anywhere on the map except on the menu div will close the
            // menu.
            this.containerListener = google.maps.event.addDomListener(
                currentMap.getDiv(),
                'mousedown',
                (e: Event) => {
                    if (e.target !== deleteMenu.menuContainer) {
                        deleteMenu.close();
                    }
                },
                true,
            );
        }

        onRemove() {
            if (this.containerListener) {
                google.maps.event.removeListener(this.containerListener);
            }

            (this.menuContainer.parentNode as HTMLElement).removeChild(this.menuContainer);

            this.set(POSITION, null);
            this.set(PATH, null);
            this.set(VERTEX_INDEX, null);
        }

        close() {
            this.setMap(null);
        }

        draw() {
            const position = this.get(POSITION);
            const projection = this.getProjection();

            if (!position || !projection) {
                return;
            }

            const point = projection.fromLatLngToDivPixel(position)!;
            this.menuContainer.style.top = `${point.y}px`;
            this.menuContainer.style.left = `${point.x}px`;
        }

        open(
            // map: google.maps.Map,
            path: google.maps.MVCArray<google.maps.LatLng>,
            vertex: number,
        ) {
            this.set(POSITION, path.getAt(vertex));
            this.set(PATH, path);
            this.set(VERTEX_INDEX, vertex);
            this.setMap(this.googleMap);
            this.draw();
        }

        removeVertex() {
            const path = this.get(PATH);
            const vertex = this.get(VERTEX_INDEX);

            if (!path || vertex === undefined) {
                this.close();
                return;
            }

            path.removeAt(vertex);
            this.close();
        }
    }

    return new ContextMenuOverlayView(map);
};
