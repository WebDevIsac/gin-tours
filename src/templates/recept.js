import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';
import { above, hover } from 'util/mediaqueries';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import SanityBlockContent from 'components/SanityBlockContent';

const Div = styled('div')``;

const Wrapper = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${above.md} {
        align-items: flex-start;
        flex-direction: row;
    }
`;

const FakeBackgroundImage = styled(GatsbyImage)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    & > img {
        object-fit: cover !important;
        object-position: 50% 25% !important;
    }
`;

const ImageWrapper = styled('div')`
    position: relative;
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    padding: 16px;

    ${above.md} {
        position: sticky;
        top: 84px;
        height: calc(100vh - 84px);
        width: 50%;
        justify-content: center;
        background-position: 50% 25%;
    }

    ${above.lg} {
        padding: 32px;
    }
`;

const H1 = styled('h1')`
    text-align: center;
    line-height: 1.2em;
`;

const Content = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;
    height: 100%;
    width: 100%;

    ${above.md} {
        width: 50%;
    }
`;

const InfoWrapper = styled('div')`
    text-align: center;
`;

const IngredientsList = styled('ul')`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Ingredient = styled('li')`
    font-size: 18px;
    width: 100%;
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

const StyledLink = styled(Link)`
    text-decoration: underline;

    ${hover} {
        transition: opacity 300ms ease;

        &:hover {
            opacity: 0.6;
        }
    }
`;

const Recipe = ({ data }) => {
    const {
        title,
        fullName,
        image,
        distillery,
        ingredients,
        link,
        showMoreInfo,
        _rawMoreInfo: moreInfo,
        _rawInstructions: instructions,
    } = data.sanityRecipes;

    return (
        <>
            <SEO title={fullName || title} />
            <Wrapper>
                <ImageWrapper>
                    <FakeBackgroundImage image={image.asset.gatsbyImageData} alt={fullName || title} />
                </ImageWrapper>
                <Content>
                    <H1>{fullName || title}</H1>
                    {!!moreInfo && showMoreInfo && (
                        <InfoWrapper>
                            <SanityBlockContent blocks={moreInfo} />
                        </InfoWrapper>
                    )}
                    <H2>Ingredienser</H2>
                    <IngredientsList>
                        {ingredients.map((ingredient, index) => (
                            <Ingredient key={index}>{ingredient}</Ingredient>
                        ))}
                    </IngredientsList>
                    <H2>Instruktioner</H2>
                    {!!instructions && (
                        <Div>
                            <SanityBlockContent blocks={instructions} />
                        </Div>
                    )}
                    {distillery?.title && (
                        <H3>
                            Recept fr??n&nbsp;
                            <StyledLink to={link} target="_blank" rel="noopener nofollow">
                                {distillery.title}
                            </StyledLink>
                        </H3>
                    )}
                </Content>
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        sanityRecipes(slug: { current: { eq: $slug } }) {
            title
            fullName
            image {
                asset {
                    gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
                }
            }
            distillery {
                title
            }
            ingredients
            link
            showMoreInfo
            _rawInstructions
            _rawMoreInfo
        }
    }
`;

Recipe.propTypes = {
    data: PropTypes.shape({
        sanityRecipes: PropTypes.shape({
            _rawInstructions: PropTypes.object,
            _rawMoreInfo: PropTypes.object,
            distillery: PropTypes.string,
            fullName: PropTypes.string,
            image: PropTypes.string,
            ingredients: PropTypes.arrayOf(PropTypes.string),
            link: PropTypes.string,
            title: PropTypes.string,
            showMoreInfo: PropTypes.bool,
        }),
    }).isRequired,
};

Recipe.Layout = Layout;

export default Recipe;
