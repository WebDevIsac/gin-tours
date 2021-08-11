import React from 'react';
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
    height: 70%;
    object-fit: cover;
`;

const Box = styled('div')`
    display: flex;
    flex-direction: column;
    padding: 32px;
    width: 100%;
    height: 30%;
    color: black;
    border-top: 1px solid black;
    flex: 1 0 auto;

    & > span {
        color: grey;
    }
`;

const Card = ({ name, place, image, index, slug }) => {
    return (
        <Link to={slug}>
            <CardWrapper index={index}>
                <Column>
                    <Image src={images[image]} />
                    <Box>
                        <span>Plats: {place}</span>
                        <h3>Titel: {name}</h3>
                        <p>Bildtext</p>
                    </Box>
                </Column>
            </CardWrapper>
        </Link>
    );
};

Card.propTypes = {
    image: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};

export default Card;
