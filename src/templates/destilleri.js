import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import GoogleMaps from 'components/GoogleMaps';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
`;

const H1 = styled('h1')``;

const Button = styled('button')`
    font-size: 24px;
    line-height: 1em;
    padding: 16px;
    text-decoration: underline;
`;

const Distillery = ({ data }) => {
    const { title, image, geopoint, slug, place } = data.sanityDistilleries;
    const { dates, price } = data.sanityProducts || {};

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <H1>{title}</H1>
                {!!dates && (
                    <>
                        <span>Tillgängliga datum</span>
                        <ul>
                            {dates.map(date => (
                                <li key={date}>{date}</li>
                            ))}
                        </ul>
                    </>
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
