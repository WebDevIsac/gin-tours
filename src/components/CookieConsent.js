import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import styled from '@emotion/styled';

const CookieBox = styled('div')`
    position: fixed;
    bottom: 16px;
    left: 16px;
    padding: 16px;
    color: black;
    background-color: white;
    border: 1px solid darkgrey;
    border-radius: 25px;
`;

const Button = styled('button')`
    padding: 12px;
    color: white;
    background-color: grey;
    border-radius: 10px;

    &:first-of-type {
        margin-right: 8px;
    }
`;

const CookieConsent = () => {
    const [renderConsent, setRenderConsent] = useState(
        !Cookies.get('cookie_consent')
    );

    const handleCookieConsent = (isAccepted) => {
        console.log(isAccepted);
        if (isAccepted) {
            Cookies.set('cookie_consent', 'true', { expires: 30 });

            setRenderConsent(false);
        } else {
            Cookies.remove('cookie_consent');

            setRenderConsent(false);
        }

        console.log(renderConsent);
    };

    console.log(renderConsent);

    return renderConsent ? (
        <CookieBox>
            <p>
                Vi använder cookies för att förenkla och ge dig en bättre
                upplevelse på vår webbplats.
            </p>
            <p>
                Genom att acceptera bekräftar du att du samtycker till vår
                användning av kakor.
            </p>
            <Button type="button" onClick={() => handleCookieConsent(true)}>
                Acceptera
            </Button>
            <Button type="button" onClick={() => handleCookieConsent(false)}>
                Neka
            </Button>
        </CookieBox>
    ) : null;
};

CookieConsent.propTypes = {};

export default CookieConsent;
