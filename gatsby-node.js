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
        }
    `);

    data.allTravelsJson.edges.forEach((edge) => {
        const slug = edge.node.slug;

        actions.createPage({
            path: slug,
            component: require.resolve('./src/templates/resa.js'),
            context: { slug },
        });
    });
};
