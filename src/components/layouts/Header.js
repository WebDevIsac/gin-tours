import React, { useEffect, useState } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import { above, below, hover } from 'util/mediaqueries';
import colors from 'config/colors';
import logo from 'images/logo.png';

const Navbar = styled('div')`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 84px;
    padding: 0 16px;
    color: ${colors.white};
    background-color: ${colors.greige};

    ${above.md} {
        justify-content: space-between;
        padding: 0 32px;
    }
`;

const Logotype = styled('div')`
    font-size: 24px;
    line-height: 1em;
    height: 100%;
`;

const Image = styled('img')`
    width: auto;
    height: 100%;
`;

const Hamburger = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40px;
    height: 24px;
    position: absolute;
    z-index: 3;
    right: 16px;

    ${above.lg} {
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

    ${below.lg} {
        flex-direction: column;
        position: absolute;
        z-index: 1;
        right: 0;
        top: 84px;
        width: 80vw;
        max-width: 360px;
        height: calc(100vh - 84px);
        transition: transform 300ms ease;
        transform: translateX(100%);
        background-color: ${colors.greige};
        padding-top: 32px;

        .is-open > & {
            transform: translateX(0);
        }
    }
`;

const Item = styled(Link)`
    font-size: 28px;
    line-height: 1em;
    padding: 8px 0;
    margin-bottom: 32px;
    width: 100%;
    text-align: center;

    ${above.lg} {
        width: auto;
        padding: 8px 12px;
        font-size: 18px;
        margin-bottom: 0;
        transition: border-bottom 1s ease;
        border-bottom: 1px solid transparent;
    }

    ${hover} {
        &:hover {
            border-bottom-color: ${colors.white};
        }
    }
`;

const BackgroundWrapper = styled('div')`
    display: none;

    ${below.lg} {
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

    const closeMenu = () => {
        setIsOpen(false);
        document.querySelector('body').classList.remove('prevent-scroll');
    };

    const openMenu = () => {
        setIsOpen(true);
        document.querySelector('body').classList.add('prevent-scroll');
    };

    const handleMenuState = (e, justClose = false) => {
        if (isOpen) {
            closeMenu();
        } else if (!justClose) {
            openMenu();
        }
    };

    const handleResizeEvent = () => {
        if (window.innerWidth >= 1024) {
            closeMenu();
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResizeEvent);

        return () => window.removeEventListener('resize', handleResizeEvent);
    }, []);

    return (
        <StaticQuery
            query={query}
            render={data => (
                <Navbar className={isOpen ? 'is-open' : ''}>
                    <Logotype>
                        <Link to="/">
                            <Image src={logo} />
                        </Link>
                    </Logotype>
                    <Hamburger onClick={handleMenuState}>
                        <Line />
                        <Line />
                        <Line />
                    </Hamburger>
                    <Menu>
                        {data.allMenuItemsJson.edges.map(({ node: { title, slug } }) => (
                            <Item to={slug} key={title} onClick={e => handleMenuState(e, true)}>
                                {title}
                            </Item>
                        ))}
                    </Menu>
                    <BackgroundWrapper onClick={e => handleMenuState(e, true)} />
                </Navbar>
            )}
        />
    );
};

Header.propTypes = {};

export default Header;
