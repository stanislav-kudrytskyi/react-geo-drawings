import { Point } from '.';

export const mvcToLatLong = (gLatLng: google.maps.LatLng[]): Point[] => gLatLng.map(
    (el) => ({ lat: el.lat(), lng: el.lng() }),
);

export default mvcToLatLong;
