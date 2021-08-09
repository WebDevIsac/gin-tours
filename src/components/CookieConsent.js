import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styled from '@emotion/styled';
import colors from 'config/colors';

const CookieBox = styled('div')`
    position: fixed;
    bottom: 16px;
    left: 16px;
    padding: 24px 48px 24px 24px;
    max-width: 520px;
    margin-right: 16px;
    color: ${colors.white};
    background-color: ${colors.blue};
`;

const Button = styled('button')`
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 24px;
`;

const Paragraph = styled('p')`
    margin: 0;
    font-size: 18px;
    line-height: 1em;

    &:first-of-type {
        margin-bottom: 16px;
    }
`;

const CookieConsent = () => {
    const [renderConsent, setRenderConsent] = useState(false);

    useEffect(() => {
        const consentCookie = Cookies.get('cookie_consent');

        if (consentCookie !== 'true') {
            setRenderConsent(true);
        }
    }, []);

    const handleClick = () => {
        Cookies.set('cookie_consent', 'true', { expires: 30 });

        setRenderConsent(false);
    };

    return renderConsent ? (
        <CookieBox>
            <Button type="button" onClick={handleClick}>
                ✕
            </Button>
            <Paragraph>
                Vi använder cookies för att förenkla och ge dig en bättre upplevelse på vår webbplats.
            </Paragraph>
            <Paragraph>Genom att använda vår site accepterar du detta.</Paragraph>
        </CookieBox>
    ) : null;
};

CookieConsent.propTypes = {};

export default CookieConsent;
