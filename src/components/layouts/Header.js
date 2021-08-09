import React, { useState } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import { above, below, hover } from 'src/util/mediaqueries';
import colors from 'config/colors';
import logo from 'src/images/logo.png';

const Navbar = styled('div')`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px;
    height: 84px;
    color: ${colors.white};
    background-color: ${colors.greige};
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
    background-color: ${colors.white};
`;

const Menu = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${below.md} {
        flex-direction: column;
        position: absolute;
        z-index: 1;
        top: 84px;
        left: 64px;
        right: 0;
        height: calc(100vh - 84px);
        transition: transform 300ms ease;
        transform: translateX(100%);
        color: ${colors.black};
        background-color: ${colors.white};

        .is-open > & {
            transform: translateX(0);
        }
    }
`;

const Item = styled(Link)`
    padding: 8px 12px;
    font-size: 18px;
    line-height: 1em;
    transition: all 200ms ease;
    border-bottom: 1px solid transparent;

    ${hover} {
        &:hover {
            border-bottom-color: ${colors.white};
        }
    }
`;

const BackgroundWrapper = styled('div')`
    display: none;

    ${below.md} {
        position: absolute;
        top: 84px;
        left: 0;
        right: 0;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);

        .is-open > & {
            display: block;
        }
    }
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
                <Navbar className={isOpen ? 'is-open' : ''}>
                    <Logotype>
                        <Link to="/">
                            <img width="200px" src={logo} />
                        </Link>
                    </Logotype>
                    <Hamburger onClick={handleMenuState}>
                        <Line />
                        <Line />
                        <Line />
                    </Hamburger>
                    <Menu>
                        {data.allMenuItemsJson.edges.map(({ node: { title, slug } }) => (
                            <Item to={slug} key={title} onClick={() => handleMenuState(true)}>
                                {title}
                            </Item>
                        ))}
                    </Menu>
                    <BackgroundWrapper onClick={() => handleMenuState(true)} />
                </Navbar>
            )}
        />
    );
};

Header.propTypes = {};

export default Header;
