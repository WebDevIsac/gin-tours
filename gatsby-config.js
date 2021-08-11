const path = require('path');

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
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/data/`,
            },
        },
    ],
};
