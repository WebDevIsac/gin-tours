import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import { above } from 'util/mediaqueries';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import SanityBlockContent from 'components/SanityBlockContent';

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

    ${above.lg} {
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

const GinTypes = ({ data }) => {
    const title = 'Gin typer';

    const types = data.allSanityTypes.edges;

    return (
        <>
            <SEO title={title} />
            <H1>{title}</H1>
            <Wrapper>
                {types.map(({ node: { title, _rawText: text } }) => (
                    <Section key={title}>
                        <H3>{title}</H3>
                        <SanityBlockContent blocks={text} />
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
                    _rawText
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
