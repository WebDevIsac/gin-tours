import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import Facebook from './Facebook';
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
    }
`;

const SEO = ({ title, description, image }) => {
    const { pathname } = useLocation();

    const { site } = useStaticQuery(query);

    const { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage, twitterUsername, facebookAppID } =
        site.siteMetadata;

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || '/'}`,
    };

    return (
        <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />

            <Facebook
                pageUrl={seo.url}
                type={article ? 'article' : null}
                title={seo.title}
                description={seo.description}
                image={seo.image}
                appID={facebookAppID}
            />
            <Twitter username={twitterUsername} title={seo.title} description={seo.description} image={seo.image} />
        </Helmet>
    );
};

SEO.propTypes = {
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
};

SEO.defaultProps = {
    description: null,
    image: null,
    title: null,
};

export default SEO;
