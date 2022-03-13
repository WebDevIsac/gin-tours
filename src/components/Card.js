import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { above } from 'util/mediaqueries';

const CardWrapper = styled('div')`
    position: relative;
    width: 100%;
`;

const Column = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ImageWrapper = styled('div')`
    position: relative;
    height: 100%;
    width: 100%;

    &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }

    & > * {
        width: 100%;
        height: 100%;
        object-fit: cover;

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
`;

const Box = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 120px;
    color: black;
    flex: 1 0 auto;
    padding: 12px;
`;

const Span = styled('span')`
    color: grey;
    font-size: 18px;

    ${above.md} {
        font-size: 22px;
    }
`;

const H3 = styled('h3')`
    font-size: 24px;
    line-height: 1em;
    margin: 12px 0;

    ${above.sm} {
        margin-top: 16px 0 12px;
    }

    ${above.lg} {
        font-size: 30px;
    }
`;

const Card = ({ title, place, image, slug }) => {
    return (
        <Link to={`/${slug.current}`}>
            <CardWrapper>
                <Column>
                    <ImageWrapper>
                        <GatsbyImage image={image?.asset.gatsbyImageData} alt={title} />
                    </ImageWrapper>
                    <Box>
                        <Span>{place}</Span>
                        <H3>{title}</H3>
                    </Box>
                </Column>
            </CardWrapper>
        </Link>
    );
};

Card.propTypes = {
    image: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    slug: PropTypes.object.isRequired,
};

export default Card;
