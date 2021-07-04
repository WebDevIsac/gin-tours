import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const PageLayout = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 2400px;
    margin: 0 auto;
`;

const PageWrapper = ({ children }) => {
    return <PageLayout>{children}</PageLayout>;
};

PageWrapper.propTypes = {};

export default PageWrapper;
