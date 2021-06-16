const path = require('path');

module.exports = {
    siteMetadata: {
        title: 'Gin Tours',
        description: 'Book your tailored gin tour now',
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
            },
        },
    ],
};
