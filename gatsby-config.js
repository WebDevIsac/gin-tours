const path = require('path');

module.exports = {
    siteMetadata: {
        title: 'Gin Tours',
        titleTemplate: '%s · Gin Tours',
        description: 'Book your tailored gin tour now',
        url: 'https://gintours.se',
        image: '/',
        owner: 'Gin Tours',
        twitterUsername: '@gin_tours',
        facebookAppID: '',
    },
    plugins: [
        'gatsby-plugin-emotion',
        {
            resolve: 'gatsby-plugin-root-import',
            options: {
                src: path.join(__dirname, 'src'),
                pages: path.join(__dirname, 'src/pages'),
                config: path.join(__dirname, 'src/config'),
                components: path.join(__dirname, 'src/components'),
                util: path.join(__dirname, 'src/util'),
            },
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/data/`,
            },
        },
    ],
};
