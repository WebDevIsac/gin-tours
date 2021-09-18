import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import images from 'images/distilleries';
import BookingForm from 'components/BookingForm';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
`;

const Image = styled('img')`
    width: 50%;
`;

const Distillery = ({ data }) => {
    const { title, image, information, bookingInformation, prices, accommodations /* , restaurants */ } =
        data.distilleriesJson;

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <h1>{title}</h1>
                <Image src={images[image]} />
                {information?.map((info, index) => (
                    <p key={index}>{info}</p>
                ))}
                {bookingInformation?.map((info, index) => (
                    <p key={index}>{info}</p>
                ))}
                {prices?.map((info, index) => (
                    <p key={index}>{info}</p>
                ))}
                <BookingForm distillery={title} accommodations={accommodations} /* restaurants={restaurants} */ />
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        distilleriesJson(slug: { eq: $slug }) {
            bookingInformation
            image
            information
            title
            prices
            accommodations
            # restaurants
        }
    }
`;

Distillery.propTypes = {
    data: PropTypes.shape({
        distilleriesJson: PropTypes.shape({
            accommodations: PropTypes.arrayOf(PropTypes.string),
            bookingInformation: PropTypes.arrayOf(PropTypes.string),
            image: PropTypes.string,
            information: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string,
            prices: PropTypes.array,
            restaurants: PropTypes.arrayOf(PropTypes.string),
        }),
    }).isRequired,
};

Distillery.Layout = Layout;

export default Distillery;
