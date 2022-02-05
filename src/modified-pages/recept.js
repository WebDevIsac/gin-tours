import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import { above } from 'util/mediaqueries';
import { getParamFilter, setFilterParams } from 'util/filter';
import SEO from 'components/SEO/SEO';
import Layout from 'components/layouts/Layout';
import RecipeCard from 'components/RecipeCard';
import Filter from 'components/Filter';

const CardsRow = styled('div')`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    grid-gap: 16px;
    width: 100%;
    height: 100%;
    padding: 16px;

    ${above.md} {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 16px;
    }

    ${above.lg} {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 16px;
        padding: 16px 64px;
    }

    ${above.xl} {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const Recipes = ({ data: { allSanityRecipes, allSanityDistilleries, allSanityTypes } }) => {
    const allRecipes = allSanityRecipes.edges.map(({ node }) => node);
    const allDistilleries = allSanityDistilleries.edges.map(({ node }) => ({
        ...node,
        label: node.title,
        value: node.slug.current,
    }));
    const allTypes = allSanityTypes.edges.map(({ node }) => ({
        ...node,
        label: node.title,
        value: node.title.toLowerCase().replace(/ /g, '-'),
    }));

    const { pathname } = useLocation();
    const [filters, setFilters] = useState(getParamFilter(pathname));
    const resetState = {
        distilleries: allDistilleries.map(distillery => distillery.slug.current),
        types: allTypes.map(type => type.value),
    };
    const [availableFilters, setAvailableFilters] = useState(resetState);

    useEffect(() => {
        if (Object.keys(filters)?.length) {
            const foundAvailable = allRecipes.reduce(
                (available, recipe) => {
                    const recipeDistillery = recipe.distillery.slug.current;
                    const recipeType = recipe.type?.title?.toLowerCase()?.replace(/ /g, '-');
                    if (!available.distilleries.includes(recipeDistillery)) {
                        available.distilleries.push(recipeDistillery);
                    }
                    if (!available.types.includes(recipeType)) {
                        available.types.push(recipeType);
                    }

                    return available;
                },
                { distilleries: [], types: [] }
            );

            setAvailableFilters(foundAvailable);
        } else {
            setAvailableFilters(resetState);
        }
    }, [filters]);

    const handleFilter = (value, key) => {
        if (window !== 'undefined') {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }

        setFilters(setFilterParams(value, key, filters));
    };

    const handleClear = () => {
        if (window !== 'undefined') {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }

        navigate('/recept/', {
            replace: true,
            state: {
                disableScrollUpdate: window.scrollY > 83,
            },
        });

        setFilters({});
    };

    return (
        <>
            <SEO title="Recept" />
            <Filter
                allDistilleries={allDistilleries}
                allTypes={allTypes}
                availableFilters={availableFilters}
                filters={filters}
                handleFilter={handleFilter}
                handleClear={handleClear}
            />
            <CardsRow>
                {allRecipes.map((recipe, index) => {
                    return <RecipeCard isFlippable key={index} {...recipe} />;
                })}
            </CardsRow>
        </>
    );
};

export const query = graphql`
    query ($distillery: String, $type: String) {
        allSanityRecipes(
            filter: { distillery: { title: { eq: $distillery } }, type: { title: { eq: $type } } }
            sort: { fields: _createdAt, order: DESC }
        ) {
            edges {
                node {
                    title
                    slug {
                        current
                    }
                    image {
                        asset {
                            gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
                        }
                    }
                    ingredients
                    ingredientsQuickLook
                    distillery {
                        title
                        slug {
                            current
                        }
                        badge {
                            asset {
                                gatsbyImageData(width: 70, fit: FILLMAX, placeholder: BLURRED)
                            }
                        }
                    }
                    type {
                        title
                    }
                }
            }
        }

        allSanityDistilleries {
            edges {
                node {
                    title
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
`;

Recipes.propTypes = {
    data: PropTypes.shape({
        allSanityDistilleries: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.object,
                })
            ),
        }),
        allSanityRecipes: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.object,
                })
            ),
        }),
        allSanityTypes: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.object,
                })
            ),
        }),
    }).isRequired,
};

Recipes.Layout = Layout;

export default Recipes;
