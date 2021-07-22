import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Facebook = ({ pageUrl, type, title, description, image, appID }) => (
    <Helmet>
        {pageUrl && <meta property="og:url" content={pageUrl} />}
        {type && <meta property="og:type" content={type} />}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
        {appID && <meta property="fb:app_id" content={appID} />}
    </Helmet>
);

Facebook.propTypes = {
    appID: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    pageUrl: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
};

Facebook.defaultProps = {
    appID: null,
    description: null,
    image: null,
    pageUrl: null,
    title: null,
    type: null,
};

export default Facebook;
