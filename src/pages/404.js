import React from 'react';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const NotFoundPage = () => {
    return (
        <>
            <SEO title="404 - Sidan kunde inte hittas" />
            <Wrapper>
                <h1>404 - Sidan kunde inte hittas</h1>
            </Wrapper>
        </>
    );
};

NotFoundPage.Layout = Layout;

export default NotFoundPage;
