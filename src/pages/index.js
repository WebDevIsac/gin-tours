import React from 'react';
import Layout from 'components/layouts/Layout';
import styled from '@emotion/styled';
import SEO from 'components/SEO/SEO';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const Image = styled('img')`
    object-fit: contain;
    width: 100%;
`;

const TextWrapper = styled('div')`
    margin: 32px auto;
    padding: 0 32px;
    max-width: 800px;
`;

const Paragraph = styled('p')`
    font-size: 24px;
    line-height: 1.2em;
`;

const StartPage = () => {
    return (
        <>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <SEO />
            <Wrapper>
                <Image src="https://s3-eu-west-1.amazonaws.com/v2.beefeatergin.com/stage/Article/8187/hero/1/hero_1920x858.jpeg" />
                <TextWrapper>
                    <h1>Gin Tours</h1>
                    <Paragraph>
                        Gin tours är ett nystartat företag som kommer erbjuda paketresor till olika gindestillerier i
                        Sverige. Resorna kommer bland annat innehålla gin provningar, lärande om processen att
                        framställa gin, mixa drinkar och diverse föreläsningar. I starten håller vi oss inom Sveriges
                        gränser men förhoppningen är att vi i framtiden även ska kunna erbjuda resor till destillerier
                        runt om i världen.
                    </Paragraph>
                    <Paragraph>
                        Våra resor passa sig prefekt för kompisgänget som vill hitta på en kul aktivitet,
                        förtagskickoffen eller födelsedagsresa för ginälskaren.
                    </Paragraph>
                </TextWrapper>
            </Wrapper>
        </>
    );
};

StartPage.Layout = Layout;

export default StartPage;
