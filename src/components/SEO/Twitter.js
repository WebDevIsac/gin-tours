import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Twitter = ({ cardType, username, title, description, image }) => (
    <Helmet>
        <meta name="twitter:card" content={cardType} />
        {username && <meta name="twitter:creator" content={username} />}
        {title && <meta name="twitter:title" content={title} />}
        {description && <meta name="twitter:description" content={description} />}
        {image && <meta name="twitter:image" content={description} />}
    </Helmet>
);

Twitter.propTypes = {
    cardType: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    username: PropTypes.string,
};

Twitter.defaultProps = {
    cardType: 'summary_large_image',
    description: null,
    image: null,
    title: null,
    username: null,
};

export default Twitter;
