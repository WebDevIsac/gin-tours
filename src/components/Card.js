import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const colors = ['burlywood', 'thistle', 'lightblue', 'salmon'];

const CardRow = styled('div')`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60vh;
    position: relative;
    background-color: ${({ index }) => colors[index]};
`;

const Box = styled('div')`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 200px;
    padding: 32px;
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    background-color: grey;
`;

const Card = ({ name, index }) => {
    return (
        <CardRow index={index}>
            <Box>
                <h3>Titel: {name}</h3>
                <p>Bildtext</p>
            </Box>
        </CardRow>
    );
};

Card.propTypes = {};

export default Card;
