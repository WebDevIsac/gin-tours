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

    position: relative;
    transition: transform ease-out 400ms;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

    ${({ isFlippable, isFlipped }) => `
        ${isFlippable && 'cursor: pointer;'}
        ${isFlipped && 'transform: rotateY(180deg);'}
    `}
`;

const Title = styled('h3')`
    font-size: 24px;
    line-height: 24px;
`;

const Span = styled('span')`
    font-size: 18px;
    text-align: center;

    &:not(:last-of-type) {
        margin-bottom: 12px;
    }
`;

const Column = styled('div')`
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 16px 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: ${colors.white};
`;

const FrontColumn = styled(Column)`
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    background-size: cover;
    background-position: center;
`;

const BackColumn = styled(Column)`
    background-color: ${colors.darkBlue};
    transform: rotateY(180deg);
`;

const List = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 16px;
    width: 100%;
`;

const ListWithGradient = styled(List)`
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
`;

const FrontLink = styled('div')`
    margin: 0 16px;
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 12px;
    border-radius: 20px;
`;

const BackLink = styled(FrontLink)`
    position: relative;
    z-index: 1;
    padding: 16px;
    border-radius: 30px;
`;

const RecipeCard = ({ title, image, slug, ingredients, isFlippable }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNavigation = e => {
        e.stopPropagation();
    };

    const handleFlip = () => {
        if (isFlippable) {
            setIsFlipped(bool => !bool);
        }
    };

    return (
        <CardWrapper isFlippable={isFlippable} isFlipped={isFlipped} onClick={handleFlip}>
            <FrontColumn backgroundImage={images[image]}>
                <Title>{title}</Title>
                {!isFlippable && (
                    <ListWithGradient>
                        {ingredients.map((ingredient, index) => (
                            <Span key={index}>{ingredient}</Span>
                        ))}
                    </ListWithGradient>
                )}
                {!isFlippable && (
                    <Link to={`/recept${slug}`} onClick={handleNavigation}>
                        <FrontLink>Läs hela receptet</FrontLink>
                    </Link>
                )}
            </FrontColumn>
            {isFlippable && (
                <BackColumn>
                    <Title>{title}</Title>
                    <List>
                        {ingredients.map((ingredient, index) => (
                            <Span key={index}>{ingredient}</Span>
                        ))}
                    </List>
                    <Link to={`/recept${slug}`} onClick={handleNavigation}>
                        <BackLink>Läs hela receptet</BackLink>
                    </Link>
                </BackColumn>
            )}
        </CardWrapper>
    );
};

RecipeCard.propTypes = {
    image: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFlippable: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};

RecipeCard.defaultProps = {
    isFlippable: false,
};

export default RecipeCard;
