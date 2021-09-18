import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { above } from 'util/mediaqueries';
import SEO from 'components/SEO/SEO';
import Layout from 'components/layouts/Layout';
import Card from 'components/Card';

const CardsRow = styled('div')`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    grid-gap: 16px;
    width: 100%;
    height: 100%;
    padding: 16px;

    ${above.md} {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 16px;
        padding: 16px 64px;
    }
`;

const Distilleries = ({ data }) => {
    const distilleries = data.allDistilleriesJson.edges;
    const title = 'Resor';

    return (
        <>
            <SEO title={title} />
            <h1>{title}</h1>
            <CardsRow>
                {distilleries.map(({ node }, index) => (
                    <Card key={index} {...node} />
                ))}
            </CardsRow>
        </>
    );
};

export const query = graphql`
    query {
        allDistilleriesJson {
            edges {
                node {
                    title
                    place
                    image
                    slug
                }
            }
        }
    }
`;

Distilleries.propTypes = {
    data: PropTypes.shape({
        allDistilleriesJson: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.object,
                })
            ),
        }),
    }).isRequired,
};

Distilleries.Layout = Layout;

export default Distilleries;
