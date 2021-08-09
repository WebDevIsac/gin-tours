import React from 'react';
import PropTypes from 'prop-types';

const SVG = ({ children, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...rest}>
            {children}
        </svg>
    );
};

SVG.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SVG;
