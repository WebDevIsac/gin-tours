import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { above, below } from 'util/mediaqueries';
import images from 'images/distilleries';

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

    ${below.sm} {
        height: 70%;
    }
`;

const Box = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 25%;
    color: black;
    border-top: 1px solid black;
    flex: 1 0 auto;
    padding: 12px;

    ${below.sm} {
        height: 30%;
    }

    ${above.md} {
        padding: 16px;
    }
`;

const Span = styled('span')`
    color: grey;
    font-size: 18px;

    ${above.md} {
        font-size: 22px;
    }
`;

const H3 = styled('h3')`
    font-size: 28px;
    line-height: 1em;
    margin-top: 16px;

    ${below.sm} {
        margin: 12px 0;
    }

    ${above.md} {
        font-size: 30px;
    }
`;

const Card = ({ title, place, image, slug }) => {
    return (
        <Link to={slug}>
            <CardWrapper>
                <Column>
                    <Image src={images[image]} />
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
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};

export default Card;
