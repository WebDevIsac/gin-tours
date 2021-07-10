import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import { above, below } from 'src/util/mediaqueries';
import colors from 'config/colors';

const Navbar = styled('div')`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    border-bottom: 1px solid ${colors.black};
    background-color: white;
`;

const Logotype = styled('div')`
    font-size: 24px;
    line-height: 1em;
`;

const Hamburger = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40px;
    height: 24px;
    position: relative;
    z-index: 3;

    ${above.md} {
        display: none;
    }
`;

const Line = styled('span')`
    display: inline-block;
    width: 100%;
    height: 2px;
    background-color: black;
`;

const Menu = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${below.md} {
        flex-direction: column;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        right: 0;
        transform: translateY(-100%);
        background-color: white;

        &.is-open {
            transform: translateY(0);
        }
    }
`;

const Item = styled(Link)`
    padding: 8px 12px;
    font-size: 18px;
    line-height: 1em;
`;

const query = graphql`
    query {
        allMenuItemsJson {
            edges {
                node {
                    title
                    slug
                }
            }
        }
    }
`;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuState = (justClose = false) => {
        if (justClose && isOpen) {
            setIsOpen(false);

            return;
        }

        setIsOpen(!isOpen);
    };

    return (
        <StaticQuery
            query={query}
            render={data => (
                <Navbar>
                    <Logotype>
                        <Link to="/">GIN TOURS</Link>
                    </Logotype>
                    <Hamburger onClick={handleMenuState}>
                        <Line />
                        <Line />
                        <Line />
                    </Hamburger>
                    <Menu className={isOpen ? 'is-open' : ''}>
                        {data.allMenuItemsJson.edges.map(({ node: { title, slug } }) => (
                            <Item to={slug} key={title} onClick={() => handleMenuState(true)}>
                                {title}
                            </Item>
                        ))}
                    </Menu>
                </Navbar>
            )}
        />
    );
};

Header.propTypes = {};

export default Header;
