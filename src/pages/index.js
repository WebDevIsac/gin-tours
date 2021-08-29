import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layouts/Layout';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import SEO from 'components/SEO/SEO';
import Slider from 'components/Slider';
import Card from 'components/Card';

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
    max-width: 800px;
`;

const Paragraph = styled('p')`
    font-size: 24px;
    line-height: 1.2em;
`;

const Content = styled('div')`
    margin-top: 64px;
`;

const H2 = styled('h2')`
    text-align: center;
`;

const StartPage = ({ data }) => {
    const travels = data.allTravelsJson.edges;

    return (
        <>
            <SEO title="Start" />
            <Wrapper>
                <Image src="https://s3-eu-west-1.amazonaws.com/v2.beefeatergin.com/stage/Article/8187/hero/1/hero_1920x858.jpeg" />
                <TextWrapper>
                    <h1>Gin Tours</h1>
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
                    <H2>Boka din ginresa idag!</H2>
                    <Slider>
                        {travels.map(({ node }, index) => (
                            <Card key={index} {...node} />
                        ))}
                    </Slider>
                </Content>
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query {
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
    }).isRequired,
};

StartPage.Layout = Layout;

export default StartPage;
