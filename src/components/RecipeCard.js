import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';
import { above, below } from 'util/mediaqueries';
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
        visibility: hidden;
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

    @media not all and (min-resolution: 0.001dpcm) {
        @supports (-webkit-appearance: none) {
            /* Safari Only CSS here */
            -webkit-transition: none;
        }
    }
`;

const BadgeWrapper = styled('div')`
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: -1;
`;

const Title = styled('h3')`
    font-size: 24px;
    line-height: 24px;
    text-align: center;
    margin: 0 16px 32px;
`;

const Span = styled('span')`
    text-align: center;
    font-size: 16px;
    line-height: 1em;

    ${above.md} {
        font-size: 18px;
    }

    &:not(:last-of-type) {
        margin-bottom: 12px;
    }
`;

const Column = styled('div')`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: ${colors.white};

    &.hide {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
`;

const FakeBackgroundImage = styled(GatsbyImage)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    & > img {
        object-fit: cover !important;
        object-position: 50% 0% !important;
    }
`;

const FrontColumn = styled(Column)``;

const BackColumn = styled(Column)`
    background-color: ${colors.darkBlue};
    transform: rotateY(180deg);
`;

const List = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 16px;
    margin-bottom: 16px;
`;

const ListWithGradient = styled(List)`
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.02),
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.35),
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.02)
    );
    position: absolute;
    top: 64px;
    padding: 48px 0;

    ${below.sm} {
        display: none;
    }

    ${above.lg} {
        padding: 64px 0;
    }
`;

const ScrollableList = styled(List)`
    overflow: scroll;
`;

const FrontLink = styled('div')`
    margin: 0 16px;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 12px;
    border-radius: 20px;
    transition: background-color 200ms ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

const BackLink = styled(FrontLink)`
    position: relative;
    z-index: 1;
    padding: 16px;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.6);

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
`;

const RecipeCard = ({ title, image, slug, ingredients, ingredientsQuickLook, isFlippable, distillery }) => {
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
            <FrontColumn className={isFlippable && isFlipped ? 'hide' : ''}>
                <FakeBackgroundImage image={image.asset.gatsbyImageData} alt={title} />

                {!isFlipped && (
                    <BadgeWrapper>
                        <GatsbyImage image={distillery.badge.asset.gatsbyImageData} alt={`${title}-badge`} />
                    </BadgeWrapper>
                )}
                <Title>{title}</Title>
                {!isFlippable && (
                    <ListWithGradient>
                        {ingredients.map((ingredient, index) => (
                            <Span key={index}>{ingredient}</Span>
                        ))}
                    </ListWithGradient>
                )}
                {isFlippable ? (
                    <FrontLink>Se ingredienser</FrontLink>
                ) : (
                    <Link to={`/recept${slug.current}`} onClick={handleNavigation}>
                        <FrontLink>Läs hela receptet</FrontLink>
                    </Link>
                )}
            </FrontColumn>
            {isFlippable && (
                <BackColumn className={isFlipped ? '' : 'hide'}>
                    <Title>{title}</Title>
                    <ScrollableList>
                        {(ingredientsQuickLook.length ? ingredientsQuickLook : ingredients).map((ingredient, index) => (
                            <Span key={index}>{ingredient}</Span>
                        ))}
                    </ScrollableList>
                    <Link to={`/recept${slug.current}`} onClick={handleNavigation}>
                        <BackLink>Läs hela receptet</BackLink>
                    </Link>
                </BackColumn>
            )}
        </CardWrapper>
    );
};

RecipeCard.propTypes = {
    badge: PropTypes.string,
    distillery: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    ingredientsQuickLook: PropTypes.arrayOf(PropTypes.string),
    isFlippable: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.object.isRequired,
};

RecipeCard.defaultProps = {
    badge: '',
    ingredients: [],
    ingredientsQuickLook: [],
    isFlippable: false,
};

export default RecipeCard;
