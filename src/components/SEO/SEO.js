import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import Twitter from './Twitter';

const query = graphql`
    query {
        site {
            siteMetadata {
                defaultTitle: title
                titleTemplate
                defaultDescription: description
                siteUrl: url
                defaultImage: image
                twitterUsername
                facebookAppID
            }
        }
        sanityConfigs {
            desktopImage {
                asset {
                    gatsbyImageData
                }
            }
        }
    }
`;

const SEO = ({ title, description }) => {
    const { pathname } = useLocation();

    const { site, sanityConfigs } = useStaticQuery(query);
    const image = sanityConfigs?.desktopImage?.asset?.gatsbyImageData?.images?.fallback?.src;

    const { defaultTitle, titleTemplate, defaultDescription, siteUrl, twitterUsername, facebookAppID } =
        site.siteMetadata;

    return (
        <Helmet title={title || defaultTitle} titleTemplate={titleTemplate}>
            <meta name="description" content={description || defaultDescription} />
            <meta name="image" content={image} />
            <meta property="og:url" content={`${siteUrl}${pathname || '/'}`} />
            <meta property="og:type" content={null} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="fb:app_id" content={facebookAppID} />

            <Twitter username={twitterUsername} title={title} description={description} image={image} />
        </Helmet>
    );
};

SEO.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};

SEO.defaultProps = {
    description: null,
    title: null,
};

export default SEO;
