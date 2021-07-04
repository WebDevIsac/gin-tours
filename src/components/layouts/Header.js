import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import colors from 'config/colors';

const Navbar = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    border-bottom: 1px solid ${colors.black};
`;

const Logotype = styled('div')`
    font-size: 24px;
    line-height: 1em;
`;

const Menu = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Item = styled(Link)`
    padding: 8px 12px;
    font-size: 18px;
    line-height: 1em;
`;

const Header = (props) => {
    return (
        <Navbar>
            <Logotype>
                <Link to="/">GIN TOURS</Link>
            </Logotype>
            <Menu>
                <Item to="/">Hem</Item>
                <Item to="/resor">Resor</Item>
                <Item to="/kontakt">Kontakt</Item>
                <Item to="/om-oss">Om oss</Item>
            </Menu>
        </Navbar>
    );
};

Header.propTypes = {};

export default Header;
