import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import RecipeCard from 'components/RecipeCard';
import { above } from 'util/mediaqueries';
import colors from 'config/colors';

const FilterWrapper = styled('div')`
    position: sticky;
    top: 92px;
    z-index: 1;
    display: row;
    justify-content: center;
    align-items: center;
    margin: 12px 0;
`;

const FilterButton = styled('button')`
    padding: 12px;
    font-size: 20px;
    color: ${colors.blue};
    background: ${colors.white};
    border: 1px solid ${colors.blue};

    &.active {
        color: ${colors.white};
        background-color: ${colors.blue};
    }

    &:not(:last-of-type) {
        margin-right: 8px;
    }
`;

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

const Recipes = ({ data: { allSanityRecipes } }) => {
    const recipes = allSanityRecipes.edges.map(edge => edge.node);
    const distilleries = recipes.reduce((distilleries, recipe) => {
        if (distilleries.every(distillery => distillery.id !== recipe.distillery.id)) {
            distilleries.push(recipe.distillery);
        }

        return distilleries;
    }, []);

    const [activeFilter, setActiveFilter] = useState(null);
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);

    const handleFilter = id => {
        if (typeof id !== 'string' || id === activeFilter) {
            setActiveFilter(null);
            setFilteredRecipes(recipes);
        } else {
            const filter = recipes.filter(recipe => recipe.distillery.id === id);
            setActiveFilter(id);
            setFilteredRecipes(filter);
        }
    };

    return (
        <>
            <SEO title="Recept" />
            <FilterWrapper>
                {distilleries.map(({ id, title }) => (
                    <FilterButton
                        key={id}
                        type="button"
                        className={activeFilter === id ? 'active' : ''}
                        onClick={() => handleFilter(id)}
                    >
                        {title}
                    </FilterButton>
                ))}
                {!!activeFilter && (
                    <FilterButton type="button" onClick={handleFilter}>
                        X
                    </FilterButton>
                )}
            </FilterWrapper>
            <CardsRow>
                {filteredRecipes.map((recipe, index) => (
                    <RecipeCard isFlippable key={index} {...recipe} />
                ))}
            </CardsRow>
        </>
    );
};

export const query = graphql`
    query {
        allSanityRecipes {
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
                        id
                        title
                        badge {
                            asset {
                                gatsbyImageData(width: 70, fit: FILLMAX, placeholder: BLURRED)
                            }
                        }
                    }
                }
            }
        }
    }
`;

Recipes.propTypes = {
    data: PropTypes.shape({
        allSanityRecipes: PropTypes.shape({
            edges: PropTypes.arrayOf(
                PropTypes.exact({
                    node: PropTypes.object,
                })
            ),
        }),
    }).isRequired,
};

Recipes.Layout = Layout;

export default Recipes;
