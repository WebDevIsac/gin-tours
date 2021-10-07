import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import mobileImage from 'images/mobile-image.jpg';
import colors from 'config/colors';
import { hover } from 'util/mediaqueries';

const Wrapper = styled('div')`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(${mobileImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 30%;
    color: ${colors.white};
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

const NotFoundPage = () => {
    return (
        <>
            <SEO title="404 - Sidan kunde inte hittas" />
            <Wrapper>
                <h1>404 - Sidan kunde inte hittas</h1>
                <StyledLink to="/">Gå till startsidan</StyledLink>
            </Wrapper>
        </>
    );
};

NotFoundPage.Layout = Layout;

export default NotFoundPage;
