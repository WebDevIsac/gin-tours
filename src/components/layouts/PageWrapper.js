import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const PageLayout = styled('main')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 84px auto 0;
`;

const PageWrapper = ({ children }) => {
    return <PageLayout>{children}</PageLayout>;
};

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PageWrapper;
