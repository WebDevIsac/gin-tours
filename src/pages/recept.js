import React from 'react';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const Recipes = () => {
    return (
        <>
            <SEO title="Recept" />
            <Wrapper>
                <h1>Recept</h1>
            </Wrapper>
        </>
    );
};

Recipes.Layout = Layout;

export default Recipes;
