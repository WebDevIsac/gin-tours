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

const Image = styled('img')``;

const Travel = ({ data }) => {
    const { title, image } = data.travelsJson;

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <h1>{title}</h1>
                <Image src={images[image]} />
                <BookingForm />
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        travelsJson(slug: { eq: $slug }) {
            title
            image
        }
    }
`;

Travel.propTypes = {
    data: PropTypes.shape({
        travelsJson: PropTypes.shape({
            image: PropTypes.string,
            title: PropTypes.string,
        }),
    }).isRequired,
};

Travel.Layout = Layout;

export default Travel;
