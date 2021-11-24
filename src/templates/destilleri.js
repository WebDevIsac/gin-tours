import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from 'components/layouts/Layout';
import SEO from 'components/SEO/SEO';
import BookingForm from 'components/BookingForm';
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

const Image = styled('img')`
    width: 100%;
`;

const Paragraph = styled('p')`
    font-size: 24px;
    line-height: 1em;
`;

const OrderedList = styled('ol')``;

const ListItem = styled('li')`
    font-size: 20px;
    line-height: 1em;
`;

const ScrollButton = styled('button')`
    font-size: 18px;
    line-height: 1em;
    padding: 16px;
    text-decoration: underline;
`;

const TransportInfo = styled('span')``;

const Distillery = ({ data }) => {
    const { title, information, accommodations, travelPlan, sendToSite, restaurants, transport, images, geopoint } =
        data.sanityDistilleries;
    const { dates } = data.sanityProducts;

    const formRef = useRef();

    const handleScroll = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    console.log(geopoint);

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <H1>{title}</H1>
                <ScrollButton onClick={handleScroll}>BOKA HÄR</ScrollButton>
                <GoogleMaps />
                <OrderedList>
                    {travelPlan?.map((item, index) => (
                        <ListItem key={index}>{item}</ListItem>
                    ))}
                </OrderedList>
                {transport && <TransportInfo>{transport}</TransportInfo>}
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        sanityDistilleries(slug: { current: { eq: $slug } }) {
            title
            # geopoint
        }

        sanityProducts(distillery: { slug: { current: { eq: $slug } } }) {
            dates
        }
    }
`;

Distillery.propTypes = {
    data: PropTypes.shape({
        sanityDistilleries: PropTypes.shape({
            accommodations: PropTypes.arrayOf(PropTypes.string),
            bookingInformation: PropTypes.arrayOf(PropTypes.string),
            images: PropTypes.object,
            information: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string,
            prices: PropTypes.array,
            restaurants: PropTypes.arrayOf(PropTypes.string),
            travelPlan: PropTypes.array,
            sendToSite: PropTypes.object,
            transport: PropTypes.string,
        }),
        sanityProducts: PropTypes.shape({
            dates: PropTypes.array,
        }),
    }).isRequired,
};

Distillery.Layout = Layout;

export default Distillery;
