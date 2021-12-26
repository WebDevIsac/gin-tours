import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import colors from 'config/colors';
import { above, hover } from 'util/mediaqueries';

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
    color: ${colors.black};
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

const H1 = styled('h1')`
    font-size: 32px;
    line-height: 1.2em;
    text-align: center;

    ${above.md} {
        font-size: 56px;
    }
`;

const NotFoundPage = () => {
    return (
        <>
            <SEO title="404 - Sidan kunde inte hittas" />
            <Wrapper>
                {/* <BackgroundImage>
                    <FakeBackgroundImage image={images} alt="Page hero" />
                </BackgroundImage> */}
                <H1>
                    404
                    <br />
                    Sidan kunde inte hittas
                </H1>
                <StyledLink to="/">Gå till startsidan</StyledLink>
            </Wrapper>
        </>
    );
};

NotFoundPage.Layout = Layout;

export default NotFoundPage;
