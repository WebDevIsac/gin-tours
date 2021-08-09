import React from 'react';
import PropTypes from 'prop-types';
import SVG from './SVG';

const SocialIcon = ({ path }) => {
    return (
        <SVG fill="#FFF" width="32" height="32" viewBox="0 0 32 32">
            <path d={path} />
        </SVG>
    );
};

SocialIcon.propTypes = {
    path: PropTypes.string.isRequired,
};

export default SocialIcon;
