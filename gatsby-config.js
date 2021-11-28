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
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-image',
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
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: process.env.GATSBY_SANITY_ID,
                dataset: 'production',

                // a token with read permissions is required
                // if you have a private dataset
                // token: process.env.SANITY_TOKEN,

                // If the Sanity GraphQL API was deployed using `--tag <name>`,
                // use `graphqlTag` to specify the tag name. Defaults to `default`.
                graphqlTag: 'default',
            },
        },
        {
            resolve: 'gatsby-plugin-snipcart-advanced',
            options: {
                version: '3.3.0',
                publicApiKey: process.env.GATSBY_SNIPCART_API_KEY, // use public api key here or in environment variable
                defaultLang: 'sv',
                currency: 'sek',
                openCartOnAdd: true,
                useSideCart: true,
                // be careful with this mode cart. The cart in this mode has a bug of scroll in firefox
                // locales: {
                //     sv: {
                //         actions: {
                //             checkout: 'Gå vidare',
                //         },
                //     },
                // },
                templatesUrl: "path on your template file. Set file in the static folder, ex: '/snipcart/index.html'",
                // not work on dev. Gatsby not serve html file in dev https://github.com/gatsbyjs/gatsby/issues/13072
                innerHTML: `
                  <billing section="bottom">
                      <!-- Customization goes here -->
                  </billing>`,
            },
        },
    ],
};
