import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { baseStyle, resetStyle } from 'config/style';
import CookieConsent from 'components/CookieConsent';
import CookieUnderAge from 'components/CookieUnderAge';

import Header from './Header';
import Footer from './Footer';
import PageWrapper from './PageWrapper';

const Page = styled('div')`
    position: relative;
`;

const Layout = ({ children }) => {
    return (
        <Page>
            <Global
                styles={css`
                    ${resetStyle}
                    ${baseStyle}
                `}
            />
            <Header />
            <PageWrapper>{children}</PageWrapper>
            <Footer />
            <CookieConsent />
            <CookieUnderAge />
        </Page>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
