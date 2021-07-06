import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import Card from 'components/Card';

const CardsRow = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    grid-gap: 16px;
    width: 100%;
    height: 100%;
    padding: 16px 64px;
`;

const Travels = () => {
    const travels = [
        {
            title: 'Hernö',
            place: 'Härnösand',
            image: 'herno',
        },
        {
            title: 'Stockholms Bränneri',
            place: 'Stockholm',
            image: 'stockholm',
        },
        {
            title: 'Lydens Gin',
            place: 'Ljungby',
            image: 'lyden',
        },
        {
            title: 'Hellströms Gin',
            place: 'Gotland',
            image: 'hellstrom',
        },
    ];

    return (
        <>
            <h1>Resor</h1>
            <CardsRow>
                {travels.map(({ title, place, image }, index) => (
                    <Card
                        name={title}
                        place={place}
                        image={image}
                        index={index}
                    />
                ))}
            </CardsRow>
        </>
    );
};

Travels.propTypes = {};

Travels.Layout = Layout;

export default Travels;
