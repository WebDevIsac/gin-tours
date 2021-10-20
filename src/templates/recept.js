import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import colors from 'config/colors';
import { above, hover } from 'util/mediaqueries';
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
    background-position: 50% 0%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    ${above.md} {
        justify-content: center;
        background-position: 50% 25%;
    }
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
    max-width: 800px;
`;

const IngredientsList = styled('ul')`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Ingredient = styled('li')`
    font-size: 18px;
    width: 35%;
    text-align: left;
    margin-bottom: 8px;
`;

const H2 = styled('h2')`
    font-size: 24px;
`;

const H3 = styled('h3')`
    font-size: 18px;
    line-height: 1.2em;
`;

const Instructions = styled('p')`
    font-size: 20px;
    line-height: 1.2em;
`;

const StyledLink = styled(Link)`
    text-decoration: underline;

    ${hover} {
        transition: opacity 200ms ease;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Recipe = ({ data }) => {
    const { title, image, creator, ingredients, instructions, link } = data.recipesJson;

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <BackgroundImage style={{ backgroundImage: `url(${images[image]})` }}>
                    <H1>{title}</H1>
                </BackgroundImage>
                <Content>
                    <H2>Ingredienser</H2>
                    <IngredientsList>
                        {ingredients.map((ingredient, index) => (
                            <Ingredient key={index}>{ingredient}</Ingredient>
                        ))}
                    </IngredientsList>
                    <H2>Instruktioner</H2>
                    {instructions && <Instructions>{instructions}</Instructions>}
                    <H3>
                        Recept från{' '}
                        <StyledLink to={link} target="_blank" rel="noopener nofollow">
                            {creator}
                        </StyledLink>
                    </H3>
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
            creator
            ingredients
            instructions
            link
        }
    }
`;

Recipe.propTypes = {
    data: PropTypes.shape({
        recipesJson: PropTypes.shape({
            creator: PropTypes.string,
            image: PropTypes.string,
            ingredients: PropTypes.arrayOf(PropTypes.string),
            instructions: PropTypes.string,
            link: PropTypes.string,
            title: PropTypes.string,
        }),
    }).isRequired,
};

Recipe.Layout = Layout;

export default Recipe;
