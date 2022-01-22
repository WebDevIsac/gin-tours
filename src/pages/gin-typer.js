import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import { above } from 'util/mediaqueries';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    max-width: 1200px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;

    ${above.md} {
        padding: 0 32px;
    }
`;

const H1 = styled('h1')`
    display: none;
`;

const Section = styled('section')`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;

    &:nth-of-type(odd) {
        align-items: end;
    }

    ${above.md} {
        padding-right: 35%;

        &:not(:first-of-type) {
            margin-top: -96px;
        }

        &:nth-of-type(odd) {
            padding-right: 0;
            padding-left: 35%;
        }
    }
`;

const H3 = styled('h3')`
    font-size: 32px;
    line-height: 1em;
`;

const Text = styled('p')`
    font-size: 20px;
    line-height: 1em;
`;

const GinTypes = ({ data }) => {
    const title = 'Gin typer';

    const types = data.allSanityTypes.edges;

    return (
        <>
            <SEO title={title} />
            <H1>{title}</H1>
            <Wrapper>
                {types.map(({ node: { title, text } }) => (
                    <Section key={title}>
                        <H3>{title}</H3>
                        {(text || []).map(
                            ({ children }, index) =>
                                !!children?.[0]?.text && <Text key={index}>{children[0].text}</Text>
                        )}
                    </Section>
                ))}
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query {
        allSanityTypes {
            edges {
                node {
                    title
                    text {
                        children {
                            text
                        }
                    }
                }
            }
        }
    }
`;

GinTypes.propTypes = {
    data: PropTypes.shape({
        allSanityTypes: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.object,
                })
            ),
        }),
    }).isRequired,
};

GinTypes.Layout = Layout;

export default GinTypes;
