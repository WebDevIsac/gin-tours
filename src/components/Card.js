import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import images from 'images/destilleries';
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
`;

const Image = styled('img')`
    width: 100%;
    height: 75%;
    object-fit: cover;
`;

const Box = styled('div')`
    display: flex;
    flex-direction: column;
    padding: 32px;
    width: 100%;
    height: 25%;
    color: black;
    border-top: 1px solid black;
    flex: 1 0 auto;
`;

const Span = styled('span')`
    color: grey;
    font-size: 18px;
`;

const H2 = styled('h2')`
    font-size: 28px;
`;

const Card = ({ title, place, image, slug }) => {
    return (
        <Link to={slug}>
            <CardWrapper>
                <Column>
                    <Image src={images[image]} />
                    <Box>
                        <Span>{place}</Span>
                        <H2>{title}</H2>
                    </Box>
                </Column>
            </CardWrapper>
        </Link>
    );
};

Card.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};

export default Card;
