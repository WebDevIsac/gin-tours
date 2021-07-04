import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import Card from 'components/Card';

const CardsFlex = styled('div')`
    width: 100%;
`;

const Travels = (props) => {
    const travels = [
        'Hernö',
        'Stockholms Bränneri',
        'Lydens Gin',
        'Hellströms Gin',
    ];
    return (
        <>
            <h1>Resor</h1>
            <CardsFlex>
                {travels.map((t, index) => (
                    <Card name={t} index={index} />
                ))}
            </CardsFlex>
        </>
    );
};

Travels.propTypes = {};

Travels.Layout = Layout;

export default Travels;
