import React, { useState } from 'react';
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
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: ${colors.white};
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    background-size: cover;
    background-position: center;
    padding: 16px 0;
`;

const Box = styled('div')`
    font-size: 24px;
`;

const List = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 16px;
    width: 100%;

    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
`;

const Span = styled('span')`
    font-size: 18px;
    text-align: center;

    &:not(:last-of-type) {
        margin-bottom: 12px;
    }
`;

const BottomLink = styled('div')`
    margin: 0 16px;
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 12px;
    border-radius: 20px;
`;

const RecipeCard = ({ title, image, slug, ingredients }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNavigation = e => {
        e.stopPropagation();
    };

    return (
        <CardWrapper onClick={() => setIsFlipped(bool => !bool)}>
            <Column backgroundImage={images[image]}>
                <Box>
                    <h3>{title}</h3>
                </Box>
                <List>
                    {ingredients.map((ingredient, index) => (
                        <Span key={index}>{ingredient}</Span>
                    ))}
                </List>
                <BottomLink>
                    <Link to={`/recept${slug}`} onClick={handleNavigation}>
                        Läs hela receptet
                    </Link>
                </BottomLink>
            </Column>
        </CardWrapper>
    );
};

RecipeCard.propTypes = {
    image: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};

export default RecipeCard;
