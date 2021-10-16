import React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import { above } from 'util/mediaqueries';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    max-width: 1200px;
    padding: 0 16px;

    ${above.md} {
        padding: 0 32px;
    }
`;

const H1 = styled('h1')`
    display: none;
`;

const Section = styled('section')``;

const H3 = styled('h3')`
    font-size: 32px;
    line-height: 1em;
`;

const Text = styled('p')`
    font-size: 20px;
    line-height: 1em;
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
            <H1>{title}</H1>
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
