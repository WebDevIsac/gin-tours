import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { baseStyle, resetStyle } from 'config/style';

import Header from './Header';
import Footer from './Footer';
import PageWrapper from './PageWrapper';

const Layout = ({ children }) => {
    return (
        <>
            <Global
                styles={css`
                    ${resetStyle}
                    ${baseStyle}
                `}
            />
            <Header />
            <PageWrapper>{children}</PageWrapper>
            <Footer />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
