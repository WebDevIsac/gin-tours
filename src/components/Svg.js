import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({ path }) => {
    console.log(path);
    return (
        <svg fill="#FFF" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path d={path} />
        </svg>
    );
};

Svg.propTypes = {
    path: PropTypes.string.isRequired,
};

export default Svg;
