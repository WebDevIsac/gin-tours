import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const Wrapper = styled('div')`
    width: 100%;
    height: 70vh;
    max-height: 800px;
    position: relative;
`;

const Marker = styled('div')`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    cursor: ${props => (props.onClick ? 'pointer' : 'default')};
`;

const Comp = ({ image }) => (
    <Marker>
        <GatsbyImage image={image} alt="map pin" />
    </Marker>
);

Comp.propTypes = {
    image: PropTypes.object.isRequired,
};

const query = graphql`
    query {
        sanityConfigs {
            pin {
                asset {
                    gatsbyImageData(width: 24, height: 24, fit: FILLMAX, placeholder: BLURRED)
                }
            }
        }
    }
`;

const GoogleMaps = ({ geopoint }) => {
    return (
        <Wrapper>
            <StaticQuery
                query={query}
                render={data => (
                    <GoogleMapReact
                        yesIWantToUseGoogleMapApiInternals
                        bootstrapURLKeys={{
                            key: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
                        }}
                        defaultCenter={geopoint}
                        defaultZoom={9}
                    >
                        <Comp
                            lat={geopoint.lat}
                            lng={geopoint.lng}
                            image={data.sanityConfigs.pin.asset.gatsbyImageData}
                        />
                    </GoogleMapReact>
                )}
            />
        </Wrapper>
    );
};

GoogleMaps.propTypes = {
    geopoint: PropTypes.object.isRequired,
};

export default GoogleMaps;
