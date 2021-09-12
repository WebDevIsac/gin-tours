import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import colors from 'config/colors';
import { above } from 'util/mediaqueries';
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

const BackgroundImage = styled('div')`
    width: 100%;
    height: 80vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const H1 = styled('h1')`
    color: ${colors.white};
    text-align: center;
`;

const Content = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
`;

const IngredientsList = styled('ul')`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Ingredient = styled('li')`
    width: 80%;
    text-align: left;
    margin-bottom: 8px;
`;

const H3 = styled('h3')`
    font-size: 24px;
`;

const Instructions = styled('p')`
    font-size: 20px;
    line-height: 1.2em;
`;

const Recipe = ({ data }) => {
    const { title, image, ingredients, instructions } = data.recipesJson;

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <BackgroundImage style={{ backgroundImage: `url(${images[image]})` }}>
                    <H1>{title}</H1>
                </BackgroundImage>
                <Content>
                    <H3>Ingredienser</H3>
                    <IngredientsList>
                        {ingredients.map((ingredient, index) => (
                            <Ingredient key={index}>{ingredient}</Ingredient>
                        ))}
                    </IngredientsList>
                    <H3>Instruktioner</H3>
                    {instructions && <Instructions>{instructions}</Instructions>}
                </Content>
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        recipesJson(slug: { eq: $slug }) {
            title
            image
            ingredients
            instructions
        }
    }
`;

Recipe.propTypes = {
    data: PropTypes.shape({
        recipesJson: PropTypes.shape({
            image: PropTypes.string,
            title: PropTypes.string,
            ingredients: PropTypes.arrayOf(PropTypes.string),
            instructions: PropTypes.string,
        }),
    }).isRequired,
};

Recipe.Layout = Layout;

export default Recipe;
