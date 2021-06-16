import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
`;

const PageWrapper = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};

PageWrapper.propTypes = {};

export default PageWrapper;
