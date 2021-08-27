import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import images from 'images/recipes';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image = styled('img')`
    width: 25%;
`;

const Recipe = ({ data }) => {
    const { title, image } = data.recipesJson;

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <h1>{title}</h1>
                <Image src={images[image]} />
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        recipesJson(slug: { eq: $slug }) {
            title
            image
        }
    }
`;

Recipe.propTypes = {
    data: PropTypes.shape({
        recipesJson: PropTypes.shape({
            image: PropTypes.string,
            title: PropTypes.string,
        }),
    }).isRequired,
};

Recipe.Layout = Layout;

export default Recipe;
