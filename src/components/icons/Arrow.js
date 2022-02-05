import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SVG from './SVG';

const StyledSvg = styled(SVG, {
    shouldForwardProp: prop => prop !== 'color',
})`
    transition: transform 200ms ease;
    transform-origin: center;
    transform: ${({ rotation }) => `rotateX(${rotation})`};
`;

const rotations = {
    down: '0deg',
    left: '90deg',
    up: '180deg',
    right: '270deg',
};

const Arrow = ({ color, direction, height, width }) => {
    const rotation = rotations[direction];

    return (
        <StyledSvg rotation={rotation} fill={color} width={width} height={height} viewBox="0 0 330 330">
            <path d="M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0021.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z" />
        </StyledSvg>
    );
};

Arrow.propTypes = {
    color: PropTypes.string,
    direction: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
};

Arrow.defaultProps = {
    color: '#000000',
    direction: 'down',
    height: '23',
    width: '23',
};

export default Arrow;
