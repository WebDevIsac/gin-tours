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
        'gatsby-plugin-react-head',
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
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: process.env.GATSBY_GTM_ID,

                // Include GTM in development.
                //
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: true,

                // datalayer to be set before GTM is loaded
                // should be an object or a function that is executed in the browser
                //
                // Defaults to null
                defaultDataLayer: { platform: 'gatsby' },

                // Specify optional GTM environment details.
                // gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
                // gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
                // dataLayerName: 'YOUR_DATA_LAYER_NAME',

                // Name of the event that is triggered
                // on every Gatsby route change.
                //
                // Defaults to gatsby-route-change
                // routeChangeEventName: 'YOUR_ROUTE_CHANGE_EVENT_NAME',
                // Defaults to false
                enableWebVitalsTracking: true,
                // Defaults to https://www.googletagmanager.com
                // selfHostedOrigin: 'YOUR_SELF_HOSTED_ORIGIN',
            },
        },
    ],
};
