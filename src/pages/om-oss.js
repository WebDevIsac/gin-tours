import React from 'react';
import styled from '@emotion/styled';
import { above } from 'util/mediaqueries';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    margin: 32px auto;
    padding: 0 32px;
    max-width: 1200px;
    font-size: 18px;
    line-height: 1.2em;

    ${above.md} {
        padding: 0 64px;
    }
`;

const Paragraph = styled('p')``;

const StyledH2 = styled('h2')`
    margin: 64px 0 24px;
`;

const StyledLink = styled('a')`
    text-decoration: underline;
`;

const ContactWrapper = styled('div')``;

const ContactList = styled('ul')`
    padding-left: 24px;
`;

const ListItem = styled('li')``;

const OrganizationWrapper = styled('div')``;

const Column = styled('div')`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    padding-left: 24px;
`;

const Span = styled('span')``;

const About = () => {
    const title = 'Om oss';

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <h1>{title}</h1>
                <Paragraph>
                    Vi erbjuder resor till de främsta men även uppkommande destillerier runtom i landet.
                </Paragraph>
                <Paragraph>
                    Iden för Gin Tours kom genom att vi ville göra det lättare för svenskar att förstå hantverket bakom
                    en av dom mest populära spritsorterna som vi idag har och underlätta för människor att åka till
                    destillerier runt om i Sverige.
                </Paragraph>
                <Paragraph>
                    Vi vill skapa en hemsida som kan fungera som ett gin forum där vi kan hjälpa dom suveräna
                    destillerierna som vi idag har i sverige samtidigt som vi hjälper spritsorten bli mer omtyckt genom
                    att erbjuda recensioner om olika destillerier, recept, sammanfattningar om hur nya svenska giner,
                    information om hur dom olika sorterna skiljer sig samt resor till destillerierna så man kan få se
                    hur hela processen går till.
                </Paragraph>

                <ContactWrapper>
                    <StyledH2>Kontakta oss</StyledH2>
                    <ContactList>
                        <ListItem>
                            Har du några frågor,&nbsp;
                            <StyledLink href="mailto:kundservice@gintours.se">kontaka vår support</StyledLink>
                        </ListItem>
                        <ListItem>
                            Specilla önskemål eller idéer,&nbsp;
                            <StyledLink href="mailto:boka@gintours.se">boka resa via mail</StyledLink>
                        </ListItem>
                    </ContactList>
                </ContactWrapper>

                <OrganizationWrapper>
                    <StyledH2>Organisation</StyledH2>
                    <Column>
                        <Span>Isac Larsson</Span>
                        <Span>
                            E-mail: <StyledLink href="mailto:isac@gintours.se">isac@gintours.se</StyledLink>
                        </Span>
                        <Span>
                            Telefon nummer: <StyledLink href="tel:+46709482427">+46 709 48 24 27</StyledLink>
                        </Span>
                    </Column>
                    <Column>
                        <Span>Oskar Lim</Span>
                        <Span>
                            E-mail: <StyledLink href="mailto:oskar@gintours.se">oskar@gintours.se</StyledLink>
                        </Span>
                        <Span>
                            Telefon nummer: <StyledLink href="tel:+46760184800">+46 760 18 48 00</StyledLink>
                        </Span>
                    </Column>
                </OrganizationWrapper>
            </Wrapper>
        </>
    );
};

About.Layout = Layout;

export default About;
