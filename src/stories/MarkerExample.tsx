import React, { useRef, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { GeoMap, Marker, Point } from '..';
import { DrawingMode } from '../drawings/constants';

const kyiv: Point = { lat: 50.4501, lng: 30.5234 };

const MarkerExample = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [markerPoint, setMarkerPoint] = useState<Point>(kyiv);
    return (
        <Grid style={{ marginTop: 10 }} container alignItems="flex-start">
            <Grid item xs={4} container>
                <Grid item xs={6}>
                    <TextField label="Longitude" value={markerPoint.lng} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Latitude" value={markerPoint.lat} variant="outlined" />
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <div style={{ height: '600px' }} ref={ref} id="map" />
                <GeoMap containerRef={ref} center={kyiv}>
                    <Marker
                        key="my-marker"
                        coordinates={markerPoint}
                        draggable
                        onChange={(point) => {
                            setMarkerPoint(point);
                        }}
                    />
                </GeoMap>
            </Grid>
        </Grid>
    );
};

export default MarkerExample;
