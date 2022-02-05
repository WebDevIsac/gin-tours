import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import GoogleMaps from 'components/GoogleMaps';
import Slider from 'components/Slider';
import colors from 'config/colors';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
`;

const Scrollable = styled('div')`
    margin-bottom: 32px;
    display: flex;
    width: 100vw;

    & [data-glide-el='controls'] {
        & > button {
            background-color: transparent;

            & > svg {
                width: 32px;
                height: 32px;
            }
        }
    }
`;

const Box = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 400px;
    min-width: 300px;
    border: 1px solid grey;
    cursor: pointer;

    &.active {
        border-width: 3px;
        border-color: ${colors.blue};
    }
`;

const H1 = styled('h1')``;

const Button = styled('button')`
    height: 56px;
    width: 200px;
    font-size: 24px;
    border-radius: 20px;
    margin-bottom: 32px;
    color: ${colors.white};
    background-color: ${colors.blue};
    pointer-events: none;
    opacity: 0.2;

    &[data-item-custom1-value] {
        opacity: 1;
        pointer-events: initial;
    }
`;

const Distillery = ({ data }) => {
    const [value, setValue] = useState(null);
    const { title, image, geopoint, slug, place } = data.sanityDistilleries;
    const { dates, price } = data.sanityProducts || {};
    const allDatesString = dates?.join('|');

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <H1>{title}</H1>
                {!!dates?.length && (
                    <Scrollable>
                        <Slider rewind startAt={0}>
                            {dates.map(date => (
                                <Box
                                    className={value === date ? 'active' : ''}
                                    key={date}
                                    onClick={() => setValue(date)}
                                >
                                    <h3>{date}</h3>
                                    <ul>
                                        <li>Ginprovning</li>
                                        <li>Hotellnatt</li>
                                        <li>Middag</li>
                                    </ul>
                                </Box>
                            ))}
                        </Slider>
                    </Scrollable>
                )}
                {!!price && (
                    <Button
                        className="snipcart-add-item"
                        data-item-id={title.replace(' ', '-').toLowerCase()}
                        data-item-price={price}
                        data-item-url={slug.current}
                        data-item-description={`Resa till ${title} destilleri i ${place}`}
                        data-item-image={image.asset.url}
                        data-item-name={title}
                        data-item-custom1-name="Datum"
                        data-item-custom1-options={allDatesString}
                        data-item-custom1-value={value}
                    >
                        Boka resa
                    </Button>
                )}
                <GoogleMaps geopoint={geopoint} />
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        sanityDistilleries(slug: { current: { eq: $slug } }) {
            title
            place
            image {
                asset {
                    url
                }
            }
            geopoint {
                lat
                lng
            }
            slug {
                current
            }
        }

        sanityProducts(distillery: { slug: { current: { eq: $slug } } }) {
            dates
            price
        }
    }
`;

Distillery.propTypes = {
    data: PropTypes.shape({
        sanityDistilleries: PropTypes.shape({
            title: PropTypes.string,
            image: PropTypes.object,
            geopoint: PropTypes.object,
            slug: PropTypes.object,
            place: PropTypes.string,
        }),
        sanityProducts: PropTypes.shape({
            dates: PropTypes.array,
        }),
    }).isRequired,
};

Distillery.Layout = Layout;

export default Distillery;
