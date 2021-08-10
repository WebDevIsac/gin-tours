import React from 'react';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const Contact = () => {
    return (
        <>
            <SEO title="Kontakt" />
            <Wrapper>
                <h1>Kontakt</h1>
            </Wrapper>
        </>
    );
};

Contact.Layout = Layout;

export default Contact;
