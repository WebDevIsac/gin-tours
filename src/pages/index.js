import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import Layout from 'components/layouts/Layout';
import { above, hover } from 'util/mediaqueries';
import SEO from 'components/SEO/SEO';
import Slider from 'components/Slider';
import Card from 'components/Card';
import RecipeCard from 'components/RecipeCard';
import desktopImage from 'images/desktop-image.jpg';
import mobileImage from 'images/mobile-image.jpg';
import { useWindowWidth } from 'util/useWindowWidth';
import Newsletter from 'components/Newsletter';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;

    margin-top: -84px;
`;

const BackgroundImage = styled('div')`
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;

    ${hover} {
        background-attachment: fixed;
    }

    ${above.md} {
        background-position: center center;
    }
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
    const distilleries = data.allDistilleriesJson.edges;
    const recipes = data.allRecipesJson.edges;

    const image = useWindowWidth() > 768 ? desktopImage : mobileImage;

    return (
        <>
            <Helmet>
                <meta name="facebook-domain-verification" content={process.env.GATSBY_FACEBOOK_DOMAIN_VERIFICATION} />
            </Helmet>
            <SEO title="Start" />
            <Wrapper>
                <BackgroundImage style={{ backgroundImage: `url(${image})` }} />
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
                        Våra resor passar sig perfekt för kompisgänget som vill hitta på en kul aktivitet,
                        företagskickoffen eller födelsedagsresa för ginälskaren.
                    </Paragraph>
                </TextWrapper>
                <Newsletter />
                <Content>
                    <H3>Boka din ginresa idag!</H3>
                    <Slider>
                        {distilleries.map(({ node }, index) => (
                            <Card key={index} {...node} />
                        ))}
                    </Slider>
                </Content>
                <Content>
                    <H3>
                        Kolla in alla magiska recept! <Link to="/recept">Se alla</Link>
                    </H3>
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
        allDistilleriesJson {
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
        allDistilleriesJson: PropTypes.shape({
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
