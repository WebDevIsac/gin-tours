import React, { useRef } from 'react';
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
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
`;

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

const Distillery = ({ data }) => {
    const { title, bookingImage, information, accommodations, travelPlan, sendToSite, restaurants } =
        data.distilleriesJson;
    const formRef = useRef();

    const handleScroll = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <>
            <SEO title={title} />
            <Wrapper>
                <h1>{title}</h1>
                <ScrollButton onClick={handleScroll}>BOKA HÄR</ScrollButton>
                <Image src={images[bookingImage]} />
                {information?.map((info, index) => (
                    <Paragraph key={index}>{info}</Paragraph>
                ))}
                <OrderedList>
                    {travelPlan?.map((item, index) => (
                        <ListItem key={index}>{item}</ListItem>
                    ))}
                </OrderedList>

                <BookingForm
                    ref={formRef}
                    distillery={title}
                    accommodations={accommodations}
                    restaurants={restaurants}
                />
            </Wrapper>
        </>
    );
};

export const query = graphql`
    query ($slug: String!) {
        distilleriesJson(slug: { eq: $slug }) {
            bookingImage
            information
            title
            # accommodations
            travelPlan
            sendToSite {
                text
                link {
                    text
                    url
                }
            }
            # restaurants
        }
    }
`;

Distillery.propTypes = {
    data: PropTypes.shape({
        distilleriesJson: PropTypes.shape({
            accommodations: PropTypes.arrayOf(PropTypes.string),
            bookingInformation: PropTypes.arrayOf(PropTypes.string),
            bookingImage: PropTypes.string,
            information: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string,
            prices: PropTypes.array,
            restaurants: PropTypes.arrayOf(PropTypes.string),
            travelPlan: PropTypes.array,
            sendToSite: PropTypes.string,
        }),
    }).isRequired,
};

Distillery.Layout = Layout;

export default Distillery;
