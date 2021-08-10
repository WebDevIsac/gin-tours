import React from 'react';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const About = () => {
    return (
        <>
            <SEO title="Om oss" />
            <Wrapper>
                <h1>Om oss</h1>
            </Wrapper>
        </>
    );
};

About.Layout = Layout;

export default About;
