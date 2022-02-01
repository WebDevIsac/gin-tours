import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import { above } from 'util/mediaqueries';
import { decodeString, getParamResults } from 'util/filter';
import colors from 'config/colors';
import SEO from 'components/SEO/SEO';
import Layout from 'components/layouts/Layout';
import RecipeCard from 'components/RecipeCard';

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
    const [activeFilters, setActiveFilters] = useState(null);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const { search } = useLocation();

    const allRecipes = allSanityRecipes.edges.map(edge => {
        const distillery = edge.node?.distillery;
        const decodedDistilleryTitle = decodeString(distillery?.title);

        return {
            ...edge.node,
            distillery: decodedDistilleryTitle,
            distilleryObj: { ...distillery, decodedDistilleryTitle },
        };
    });

    const distilleries = allRecipes.reduce((distilleries, recipe) => {
        if (distilleries.every(distillery => distillery.title !== recipe.distilleryObj.title)) {
            distilleries.push(recipe.distilleryObj);
        }

        return distilleries;
    }, []);

    useEffect(() => {
        const [result, state] = getParamResults(allRecipes, search);

        setFilteredRecipes(result);
    }, []);

    const setFilterParam = filter => {
        if (!filter && new URLSearchParams(search).has('distillery')) {
            window.__preventScroll = true;
            navigate('/recept', { replace: true });
        } else if (filter) {
            window.__preventScroll = true;
            navigate(`/recept?distillery=${filter}`, { replace: true });
        }
    };

    const handleFilter = title => {
        if (window !== 'undefined') {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }

        const decodedTitle = decodeString(title);

        if (typeof decodedTitle !== 'string' || decodedTitle === activeFilters) {
            setActiveFilters(null);
            setFilteredRecipes(allRecipes);
            setFilterParam(null);
        } else {
            const filter = allRecipes.filter(recipe => decodeString(recipe.distillery.title) === decodedTitle);
            setActiveFilters(decodedTitle);
            setFilteredRecipes(filter);
            setFilterParam(decodedTitle);
        }
    };

    return (
        <>
            <SEO title="Recept" />
            <FilterWrapper>
                {distilleries.map(({ title }) => (
                    <FilterButton
                        key={title}
                        type="button"
                        className={activeFilters === decodeString(title) ? 'active' : ''}
                        onClick={() => handleFilter(title)}
                    >
                        {title}
                    </FilterButton>
                ))}
                {!!activeFilters && (
                    <FilterButton type="button" onClick={handleFilter}>
                        X
                    </FilterButton>
                )}
            </FilterWrapper>
            <CardsRow>
                {filteredRecipes.map((recipe, index) => {
                    const { distilleryObj: distillery, ...rest } = recipe;
                    return <RecipeCard isFlippable {...rest} key={index} distillery={distillery} />;
                })}
            </CardsRow>
        </>
    );
};

export const query = graphql`
    query ($limit: Int) {
        allSanityRecipes(sort: { fields: _createdAt, order: DESC }, limit: $limit) {
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
