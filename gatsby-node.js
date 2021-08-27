exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            allTravelsJson {
                edges {
                    node {
                        slug
                    }
                }
            }

            allRecipesJson {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `);

    data.allTravelsJson.edges.forEach(edge => {
        const slug = edge.node.slug;

        actions.createPage({
            path: slug,
            component: require.resolve('./src/templates/resa.js'),
            context: { slug },
        });
    });

    data.allRecipesJson.edges.forEach(edge => {
        const slug = edge.node.slug;

        actions.createPage({
            path: `/recept${slug}`,
            component: require.resolve('./src/templates/recept.js'),
            context: { slug },
        });
    });
};
