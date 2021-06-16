import React from 'react';
import Layout from 'components/layouts/Layout';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const Image = styled('img')`
    object-fit: contain;
`;

const StartPage = () => {
    return (
        <Wrapper>
            <Image src="https://s3-eu-west-1.amazonaws.com/v2.beefeatergin.com/stage/Article/8187/hero/1/hero_1920x858.jpeg" />
        </Wrapper>
    );
};

StartPage.Layout = Layout;

export default StartPage;
