import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import images from 'images/recipes';
import colors from 'config/colors';
import { Link } from 'gatsby';

const CardWrapper = styled('div')`
    position: relative;
    width: 100%;
    border: 1px solid black;

    &:after {
        content: '';
        display: block;
        padding-bottom: 150%;
    }

    & > div {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
`;

const Column = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: ${colors.white};
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    background-size: cover;
    background-position: center;
`;

const Box = styled('div')`
    font-size: 24px;
`;

const RecipeCard = ({ title, image, slug }) => {
    return (
        <CardWrapper>
            <Column backgroundImage={images[image]}>
                <Box>
                    <h3>{title}</h3>
                    <Link to={slug}>Läs hela recepter</Link>
                </Box>
            </Column>
        </CardWrapper>
    );
};

RecipeCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};

export default RecipeCard;
