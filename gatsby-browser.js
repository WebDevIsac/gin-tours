import React from 'react';

export const wrapPageElement = ({ element }) => {
    const Layout = element.type.Layout ?? React.Fragment;

    return <Layout>{element}</Layout>;
};

export const shouldUpdateScroll = () => {
    if (window.__preventScroll) {
        delete window.__preventScroll;

        return false;
    }

    return true;
};
