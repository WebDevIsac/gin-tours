import React from 'react';
import styled from '@emotion/styled';
import colors from 'config/colors';
import Socials from 'components/Socials';

const FooterWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 32px;
    background-color: ${colors.greige};
    color: ${colors.white};
    font-size: 18px;
    line-height: 1em;
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <span>Copyright &copy; 2021 Gin Tours</span>
            <Socials />
        </FooterWrapper>
    );
};

Footer.propTypes = {};

export default Footer;
