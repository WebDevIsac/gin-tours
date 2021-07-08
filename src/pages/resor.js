import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import Card from 'components/Card';
import { graphql } from 'gatsby';

const CardsRow = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    grid-gap: 16px;
    width: 100%;
    height: 100%;
    padding: 16px 64px;
`;

const Travels = ({ data }) => {
    const travels = data.allTravelsJson.edges;

    return (
        <>
            <h1>Resor</h1>
            <CardsRow>
                {travels.map(
                    ({ node: { title, place, image, slug } }, index) => (
                        <Card
                            key={index}
                            name={title}
                            place={place}
                            image={image}
                            index={index}
                            slug={slug}
                        />
                    )
                )}
            </CardsRow>
        </>
    );
};

export const query = graphql`
    query {
        allTravelsJson {
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

Travels.propTypes = {};

Travels.Layout = Layout;

export default Travels;
