import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import images from 'images/destilleries';
import BookingForm from 'components/BookingForm';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image = styled('img')`
    width: 50%;
`;

const Travel = ({ data }) => {
    const { title, image, information, bookingInformation, prices } = data.travelsJson;

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <h1>{title}</h1>
                <Image src={images[image]} />
                {information.map((info, index) => (
                    <p key={index}>{info}</p>
                ))}
                {bookingInformation.map((info, index) => (
                    <p key={index}>{info}</p>
                ))}
                {prices.map((info, index) => (
                    <p key={index}>{info}</p>
                ))}
                <BookingForm />
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        travelsJson(slug: { eq: $slug }) {
            bookingInformation
            image
            information
            title
            prices
        }
    }
`;

Travel.propTypes = {
    data: PropTypes.shape({
        travelsJson: PropTypes.shape({
            bookingInformation: PropTypes.arrayOf(PropTypes.string),
            image: PropTypes.string,
            information: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string,
            prices: PropTypes.array,
        }),
    }).isRequired,
};

Travel.Layout = Layout;

export default Travel;
