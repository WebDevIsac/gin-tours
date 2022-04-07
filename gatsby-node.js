exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            allSanityDistilleries {
                edges {
                    node {
                        title
                        isBookable
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

            allSanityTypes {
                edges {
                    node {
                        title
                    }
                }
            }
        }
    `);

    data.allSanityDistilleries.edges.forEach(({ node }) => {
        const {
            isBookable,
            slug: { current: slug },
        } = node;

        if (isBookable) {
            actions.createPage({
                path: slug,
                component: require.resolve('./src/templates/destilleri.js'),
                context: { slug },
            });
        }

        // Create recipe filter pages
        const distilleryTitle = node.title;
        actions.createPage({
            path: `/recept/destilleri/:${slug}`,
            component: require.resolve('./src/modified-pages/recept.js'),
            context: { distillery: distilleryTitle },
        });

        const builtTypePages = [];
        data.allSanityTypes.edges.forEach(({ node }) => {
            const typeTitle = node.title;
            const typeString = typeTitle.toLowerCase().replace(/ /g, '-');

            if (!builtTypePages.includes(typeString)) {
                builtTypePages.push(typeString);
                actions.createPage({
                    path: `/recept/gin-typ/:${typeString}`,
                    component: require.resolve('./src/modified-pages/recept.js'),
                    context: { type: typeTitle },
                });
            }
            actions.createPage({
                path: `/recept/destilleri/:${slug}/gin-typ/:${typeString}`,
                component: require.resolve('./src/modified-pages/recept.js'),
                context: { distillery: distilleryTitle, type: typeTitle },
            });
        });
    });

    data.allSanityRecipes.edges.forEach(({ node }) => {
        const slug = node.slug.current;

        actions.createPage({
            path: `/recept/${slug}`,
            component: require.resolve('./src/templates/recept.js'),
            context: { slug },
        });
    });

    actions.createPage({
        path: '/recept',
        component: require.resolve('./src/modified-pages/recept.js'),
    });
};
