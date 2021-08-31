import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layouts/Layout';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import SEO from 'components/SEO/SEO';
import Slider from 'components/Slider';
import Card from 'components/Card';
import RecipeCard from 'components/RecipeCard';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const Image = styled('img')`
    object-fit: contain;
    width: 100%;
`;

const TextWrapper = styled('div')`
    margin: 32px auto;
    padding: 0 32px;
    max-width: 1200px;
`;

const H1 = styled('h1')`
    font-size: 32px;
    line-height: 1em;
`;

const Paragraph = styled('p')`
    font-size: 24px;
    line-height: 1.2em;
`;

const Content = styled('div')`
    margin-top: 64px;
`;

const H3 = styled('h3')`
    text-align: center;
    font-size: 32px;
    line-height: 1em;
`;

const StartPage = ({ data }) => {
    const travels = data.allTravelsJson.edges;
    const recipes = data.allRecipesJson.edges;

    return (
        <>
            <SEO title="Start" />
            <Wrapper>
                <Image src="https://s3-eu-west-1.amazonaws.com/v2.beefeatergin.com/stage/Article/8187/hero/1/hero_1920x858.jpeg" />
                <TextWrapper>
                    <H1>Gin Tours</H1>
                    <Paragraph>
                        Gin tours är ett nystartat företag som kommer erbjuda paketresor till olika gindestillerier i
                        Sverige. Resorna kommer bland annat innehålla gin provningar, lärande om processen att
                        framställa gin, mixa drinkar och diverse föreläsningar. I starten håller vi oss inom Sveriges
                        gränser men förhoppningen är att vi i framtiden även ska kunna erbjuda resor till destillerier
                        runt om i världen.
                    </Paragraph>
                    <Paragraph>
                        Våra resor passa sig prefekt för kompisgänget som vill hitta på en kul aktivitet,
                        förtagskickoffen eller födelsedagsresa för ginälskaren.
                    </Paragraph>
                </TextWrapper>
                <Content>
                    <H3>Boka din ginresa idag!</H3>
                    <Slider>
                        {travels.map(({ node }, index) => (
                            <Card key={index} {...node} />
                        ))}
                    </Slider>
                </Content>
                <Content>
                    <H3>Kolla in våra magiska recept!</H3>
                    <Slider>
                        {recipes.map(({ node }, index) => (
                            <RecipeCard key={index} {...node} />
                        ))}
                    </Slider>
                </Content>
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query MyQuery {
        allTravelsJson {
            edges {
                node {
                    title
                    place
                    image
                    slug
                }
            }
        }
        allRecipesJson {
            edges {
                node {
                    title
                    slug
                    creator
                    image
                    ingredients
                }
            }
        }
    }
`;

StartPage.propTypes = {
    data: PropTypes.shape({
        allTravelsJson: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.object,
                })
            ),
        }),
        allRecipesJson: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.object,
                })
            ),
        }),
    }).isRequired,
};

StartPage.Layout = Layout;

export default StartPage;
