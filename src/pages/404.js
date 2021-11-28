import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { GatsbyImage, withArtDirection, getImage } from 'gatsby-plugin-image';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import colors from 'config/colors';
import { hover } from 'util/mediaqueries';

const Wrapper = styled('div')`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 30%;
    color: ${colors.white};
`;

const BackgroundImage = styled('div')`
    width: 100%;
    height: 100vh;
    position: relative;
    clip-path: inset(0);
`;

const FakeBackgroundImage = styled(GatsbyImage)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    & > img {
        object-fit: cover !important;
        object-position: 0% 0% !important;
        font-family: 'object-fit: cover !important; object-position: 0% 0% !important;';
    }
`;

const StyledLink = styled(Link)`
    font-size: 24px;
    text-decoration: underline;

    ${hover} {
        transition: opacity 200ms ease;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const NotFoundPage = ({ data }) => {
    const configs = data.sanityConfigs;

    const images = withArtDirection(getImage(configs.desktopImage.asset.gatsbyImageData), [
        {
            media: '(max-width: 1024px)',
            image: getImage(configs.mobileImage.asset.gatsbyImageData),
        },
    ]);

    return (
        <>
            <SEO title="404 - Sidan kunde inte hittas" />
            <Wrapper>
                <BackgroundImage>
                    <FakeBackgroundImage image={images} alt="Page hero" />
                </BackgroundImage>
                <h1>404 - Sidan kunde inte hittas</h1>
                <StyledLink to="/">Gå till startsidan</StyledLink>
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query NotFoundQuery {
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

NotFoundPage.Layout = Layout;

export default NotFoundPage;
