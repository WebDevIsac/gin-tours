import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import colors from 'config/colors';
import { hover } from 'util/mediaqueries';

const OverlayWrapper = styled('div')`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: ${colors.black};
    opacity: 0.5;
`;

const CookieBox = styled('div')`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    padding: 48px;
    color: black;
    background-color: ${colors.greige};
    border: 2px solid ${colors.white};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Buttons = styled('div')`
    margin-top: 24px;
`;

const Button = styled('button')`
    padding: 12px;
    color: white;
    background-color: ${colors.darkBlue};
    width: 120px;
    display: inline-block;
    text-align: center;

    ${hover} {
        &:hover {
            opacity: 0.8;
        }
    }

    &:first-of-type {
        margin-right: 8px;
    }
`;

const CookieUnderAge = () => {
    const [renderBox, setRenderBox] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const underAge = Cookies.get('under-age');

        console.log(pathname);

        if (pathname !== '/under-20' && underAge !== 'true') {
            setRenderBox(true);
        }
    }, [pathname]);

    const handleClick = () => {
        Cookies.set('under-age', 'true', { expires: 30 });

        setRenderBox(false);
    };

    return renderBox ? (
        <>
            <OverlayWrapper />
            <CookieBox>
                <p>För att se vårat utbud och boka resor behöver du vara myndig</p>
                <p>Har du fyllt 18 år?</p>
                <Buttons>
                    <Button to="/under-20" as={Link} type="button" onClick={() => setRenderBox(false)}>
                        Nej
                    </Button>
                    <Button type="button" onClick={handleClick}>
                        Ja
                    </Button>
                </Buttons>
            </CookieBox>
        </>
    ) : null;
};

CookieUnderAge.propTypes = {};

export default CookieUnderAge;
