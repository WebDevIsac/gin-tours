import React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    max-width: 800px;
`;

const Section = styled('section')``;

const H3 = styled('h3')`
    font-size: 24px;
`;

const Text = styled('p')`
    font-size: 18px;
`;

const query = graphql`
    query {
        allGinTypesJson {
            edges {
                node {
                    title
                    content
                }
            }
        }
    }
`;

const About = () => {
    const title = 'Gin typer';
    return (
        <>
            <SEO title={title} />
            <h1>{title}</h1>
            <StaticQuery
                query={query}
                render={data => (
                    <Wrapper>
                        {data.allGinTypesJson.edges.map(({ node: { title, content } }) => (
                            <Section key={title}>
                                <H3>{title}</H3>
                                {content.map((text, index) => (
                                    <Text key={index}>{text}</Text>
                                ))}
                            </Section>
                        ))}
                    </Wrapper>
                )}
            />
        </>
    );
};

About.Layout = Layout;

export default About;
