import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import RecipeCard from 'components/RecipeCard';
import { above } from 'util/mediaqueries';

const CardsRow = styled('div')`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    grid-gap: 16px;
    width: 100%;
    height: 100%;
    padding: 16px;

    ${above.md} {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 16px;
        padding: 16px 64px;
    }

    ${above.xl} {
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 16px;
        padding: 16px 64px;
    }
`;

const Recipes = ({ data }) => {
    const recipes = data.allRecipesJson.edges;
    const title = 'Recept';

    return (
        <>
            <SEO title={title} />
            <h1>{title}</h1>
            <CardsRow>
                {recipes.map(({ node }, index) => (
                    <RecipeCard key={index} {...node} />
                ))}
            </CardsRow>
        </>
    );
};

export const query = graphql`
    query {
        allRecipesJson {
            edges {
                node {
                    title
                    slug
                    creator
                    image
                }
            }
        }
    }
`;

Recipes.propTypes = {
    data: PropTypes.shape({
        allRecipesJson: PropTypes.shape({
            edges: PropTypes.arrayOf({
                node: PropTypes.shape({
                    title: PropTypes.string,
                    place: PropTypes.string,
                    image: PropTypes.string,
                    slug: PropTypes.string,
                }),
            }),
        }),
    }).isRequired,
};

Recipes.Layout = Layout;

export default Recipes;
