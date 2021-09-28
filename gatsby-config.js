const path = require('path');

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        title: 'Gin Tours',
        titleTemplate: '%s · Gin Tours',
        description: 'Boka din skräddarsydda ginresa idag',
        url: 'https://gintours.se',
        image: '/',
        owner: 'Gin Tours',
        twitterUsername: '@gin_tours',
        facebookAppID: '',
    },
    plugins: [
        'gatsby-plugin-emotion',
        'gatsby-transformer-json',
        {
            resolve: 'gatsby-plugin-root-import',
            options: {
                src: path.join(__dirname, 'src'),
                pages: path.join(__dirname, 'src/pages'),
                templates: path.join(__dirname, 'src/templates'),
                components: path.join(__dirname, 'src/components'),
                config: path.join(__dirname, 'src/config'),
                util: path.join(__dirname, 'src/util'),
                images: path.join(__dirname, 'src/images'),
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/data/`,
            },
        },
        {
            resolve: 'gatsby-plugin-mailchimp',
            options: {
                endpoint: process.env.GATSBY_MAILCHIMP_ENDPOINT,
                timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                // You can add multiple tracking ids and a pageview event will be fired for all of them.
                trackingIds: [
                    process.env.GATSBY_GOOGLE_ANALYTICS_ID, // Google Analytics / GA
                    // 'AW-CONVERSION_ID', // Google Ads / Adwords / AW
                    // 'DC-FLOODIGHT_ID', // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
                ],
                // This object gets passed directly to the gtag config command
                // This config will be shared across all trackingIds
                gtagConfig: {
                    // 'optimize_id': 'OPT_CONTAINER_ID',
                    'anonymize_ip': true,
                    'cookie_expires': 1,
                },
                // This object is used for configuration specific to this plugin
                pluginConfig: {
                    // Puts tracking script in the head instead of the body
                    head: false,
                    // Setting this parameter is also optional
                    respectDNT: true,
                    // Avoids sending pageview hits from custom paths
                    exclude: [],
                },
            },
        },
    ],
};
