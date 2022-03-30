import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { GatsbyImage, withArtDirection, getImage } from 'gatsby-plugin-image';
import Layout from 'components/layouts/Layout';
import { above, hover } from 'util/mediaqueries';
import SEO from 'components/SEO/SEO';
import Slider from 'components/Slider';
import Card from 'components/Card';
import RecipeCard from 'components/RecipeCard';
import Newsletter from 'components/Newsletter';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;

    margin-top: -84px;
`;

const BackgroundImage = styled('div', {
    shouldForwardProp: prop => prop !== 'height',
})`
    width: 100%;
    position: relative;
    clip-path: inset(0);
    height: 100vh;

    @supports (-webkit-overflow-scrolling: touch) {
        height: ${({ height }) => height};
    }
`;

const FakeBackgroundImage = styled(GatsbyImage, {
    shouldForwardProp: prop => prop !== 'height',
})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    height: 100%;

    @supports (-webkit-overflow-scrolling: touch) {
        height: ${({ height }) => height};
    }

    & > img {
        object-fit: cover !important;
        object-position: 0% 0% !important;
        font-family: 'object-fit: cover !important; object-position: 0% 0% !important;';
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
    padding: 32px 0;

    ${above.md} {
        padding: 64px 0;
    }
`;

const H2 = styled('h2')`
    text-align: center;
    line-height: 1em;
    margin: 0 8px 16px;
    font-size: 24px;

    ${above.md} {
        font-size: 32px;
    }
`;

const Underline = styled('span')`
    text-decoration: underline;

    ${hover} {
        transition: opacity 300ms ease;
        &:hover {
            opacity: 0.6;
        }
    }
`;

const StartPage = ({ data }) => {
    const [heroHeight, setHeroHeight] = useState('100vh');

    useEffect(() => {
        if (window !== undefined) {
            const windowHeight = window.innerHeight;
            setHeroHeight(`${windowHeight}px`);
        }
    }, []);

    const distilleries = data.allSanityDistilleries.edges;
    const recipes = data.allSanityRecipes.edges;
    const configs = data.sanityConfigs;

    const images = withArtDirection(getImage(configs.desktopImage.asset.gatsbyImageData), [
        {
            media: '(max-width: 1024px)',
            image: getImage(configs.mobileImage.asset.gatsbyImageData),
        },
    ]);

    return (
        <>
            <Helmet>
                <meta name="facebook-domain-verification" content={process.env.GATSBY_FACEBOOK_DOMAIN_VERIFICATION} />
            </Helmet>
            <SEO title="Start" />
            <Wrapper>
                <BackgroundImage height={heroHeight}>
                    <FakeBackgroundImage height={heroHeight} image={images} alt="Page hero" />
                </BackgroundImage>
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
                {/* <Content>
                    <H2>Boka din ginresa idag!</H2>
                    <Slider rewind startAt={0}>
                        {distilleries.map(({ node }, index) => (
                            <Card key={index} {...node} />
                        ))}
                    </Slider>
                </Content> */}
                <Content>
                    <H2>
                        <Link to="/recept">
                            Kolla in alla magiska recept <Underline>här!</Underline>
                        </Link>
                    </H2>
                    <Slider rewind startAt={recipes.length / 2}>
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
    query FrontPageQuery {
        allSanityDistilleries {
            edges {
                node {
                    title
                    place
                    image {
                        asset {
                            gatsbyImageData(fit: FILLMAX, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                        }
                    }
                    slug {
                        current
                    }
                }
            }
        }
        allSanityRecipes {
            edges {
                node {
                    title
                    slug {
                        current
                    }
                    image {
                        asset {
                            gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
                        }
                    }
                    ingredients
                    distillery {
                        badge {
                            asset {
                                gatsbyImageData(width: 70, fit: FILLMAX, placeholder: BLURRED)
                            }
                        }
                    }
                }
            }
        }
        sanityConfigs {
            desktopImage {
                asset {
                    gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
                }
            }
            mobileImage {
                asset {
                    gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
                }
            }
        }
    }
`;

StartPage.propTypes = {
    data: PropTypes.shape({
        allSanityDistilleries: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.object,
                })
            ),
        }),
        allSanityRecipes: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.object,
                })
            ),
        }),
        sanityConfigs: PropTypes.shape({
            desktopImage: PropTypes.shape({
                asset: PropTypes.object,
            }),
            mobileImage: PropTypes.shape({
                asset: PropTypes.object,
            }),
        }),
    }).isRequired,
};

StartPage.Layout = Layout;

export default StartPage;
