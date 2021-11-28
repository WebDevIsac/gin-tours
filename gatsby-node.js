exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            allSanityDistilleries {
                edges {
                    node {
                        slug {
                            current
                        }
                    }
                }
            }

            allSanityRecipes {
                edges {
                    node {
                        slug {
                            current
                        }
                    }
                }
            }
        }
    `);

    // data.allSanityDistilleries.edges.forEach(edge => {
    //     const slug = edge.node.slug.current;

    //     actions.createPage({
    //         path: slug,
    //         component: require.resolve('./src/templates/destilleri.js'),
    //         context: { slug },
    //     });
    // });

    data.allSanityRecipes.edges.forEach(edge => {
        const slug = edge.node.slug.current;

        actions.createPage({
            path: `/recept${slug}`,
            component: require.resolve('./src/templates/recept.js'),
            context: { slug },
        });
    });
};
