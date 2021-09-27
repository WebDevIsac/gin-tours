import React from 'react';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const StyledLink = styled('a')`
    text-decoration: underline;
`;

const About = () => {
    const title = 'Om oss';
    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <h1>{title}</h1>
                <p>Vi erbjuder resor till de främsta men även uppkommande destillerier runtom i landet</p>

                <h3>Kontaktuppgifter</h3>
                <ul>
                    <li>
                        Har du några frågor,{' '}
                        <StyledLink href="mailto:kundservice@gintours.se">kontaka vår support</StyledLink>
                    </li>
                    <li>
                        Specilla önskemål eller idéer,{' '}
                        <StyledLink href="mailto:boka@gintours.se">boka via mail</StyledLink>
                    </li>
                    <li>
                        Intresserad av att samarbeta med oss,{' '}
                        <StyledLink href="mailto:boka@gintours.se">skicka ett mail</StyledLink>
                    </li>
                </ul>
            </Wrapper>
        </>
    );
};

About.Layout = Layout;

export default About;
