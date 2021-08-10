import React from 'react';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const UnderAge = () => {
    return (
        <>
            <SEO title="Under 20" />
            <Wrapper>
                <h1>Under 20</h1>
                <p>
                    Du är tyvärr för ung för att ta del av våra resor. Har du kommit hit av misstag gå tillbaks till
                    startsidan
                </p>
            </Wrapper>
        </>
    );
};

UnderAge.Layout = Layout;

export default UnderAge;
