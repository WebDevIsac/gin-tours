import React from 'react';
import GoogleMapReact from 'google-map-react';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
    width: 100%;
    height: 70vh;
    max-height: 800px;
`;

const Marker = styled('div')`
    width: 4px;
    height: 8px;
    background-color: red;
`;

const GoogleMaps = () => {
    const config = {
        center: {
            lat: 62.64129921893747,
            lng: 17.775197100695447,
        },
        zoom: 11,
    };

    return (
        <Wrapper>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
                defaultCenter={config.center}
                defaultZoom={config.zoom}
            >
                <Marker lat={62.64129921893747} lng={17.775197100695447} />
            </GoogleMapReact>
        </Wrapper>
    );
};

export default GoogleMaps;
