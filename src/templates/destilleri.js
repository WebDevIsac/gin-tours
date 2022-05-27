import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
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

const SliderWrapper = styled('div')`
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 400px;
    min-width: 300px;
    border: 3px solid transparent;
    cursor: pointer;
    padding: 30px;
    transition: border-color 500ms ease;
    color: ${colors.lightGreen};

    &.active {
        border-color: ${colors.blue};
    }
`;

const FakeBackgroundImage = styled(GatsbyImage)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    @keyframes filter {
        0% {
            filter: grayscale(100%);
        }
        100% {
            filter: grayscale(0);
        }
    }

    & > img {
        object-fit: cover !important;
        object-position: 50% 0% !important;
        filter: grayscale(100%);
    }

    .active > & > img {
        animation: filter 700ms ease forwards;
    }
`;

const H1 = styled('h1')``;

const DateText = styled('h3')`
    width: fit-content;
    font-size: 32px;
    line-height: 1.2em;
    text-decoration: underline;
`;

const SelectedSpan = styled('p')`
    font-size: 20px;
`;

const Button = styled('button')`
    height: 56px;
    width: auto;
    padding: 0 20px;
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
    const { title, image, geopoint, slug, place } = data.sanityDistilleries;
    const { dates = [], price } = data.sanityProducts || {};
    const deepCloneDate = JSON.parse(JSON.stringify(dates));
    const localizedDates = deepCloneDate.map(item => {
        const dateAsTimestamp = new Date(item.date).getTime();
        const localizedDate = format(dateAsTimestamp, 'dd MMMM yyyy', { locale: sv });

        return {
            timestamp: dateAsTimestamp,
            date: localizedDate,
            image: item.image.asset.gatsbyImageData,
        };
    });

    const sortedDates = localizedDates.sort((a, b) => a.timestamp - b.timestamp);
    const allDatesString = sortedDates.map(({ date }) => date)?.join('|');
    const [value, setValue] = useState(sortedDates[0]?.date);

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <H1>{title}</H1>
                {!!dates?.length && (
                    <SliderWrapper>
                        <Slider rewind startAt={0}>
                            {sortedDates.map(({ date, image }) => (
                                <Box
                                    className={value === date ? 'active' : ''}
                                    key={date}
                                    onClick={() => setValue(date)}
                                >
                                    <FakeBackgroundImage image={image} alt={date} />
                                    <DateText>{date}</DateText>
                                </Box>
                            ))}
                        </Slider>
                    </SliderWrapper>
                )}
                {!!price && (
                    <>
                        {value && <SelectedSpan>Valt datum: {value}</SelectedSpan>}
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
                            Boka resa - {price}:-
                        </Button>
                    </>
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
            dates {
                date
                image {
                    asset {
                        gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
                    }
                }
            }
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
