exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            allDistilleriesJson {
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

    data.allDistilleriesJson.edges.forEach(edge => {
        const slug = edge.node.slug;

        actions.createPage({
            path: slug,
            component: require.resolve('./src/templates/destilleri.js'),
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
