import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import images from 'src/images/destilleries';

const Image = styled('img')``;

const Travel = ({ data }) => {
    const { title, image } = data.travelsJson;
    return (
        <>
            <h1>{title}</h1>
            <Image src={images[image]} />
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        travelsJson(slug: { eq: $slug }) {
            title
            image
        }
    }
`;

Travel.propTypes = {};

Travel.Layout = Layout;

export default Travel;
