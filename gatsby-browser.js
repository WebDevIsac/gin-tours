import React from 'react';

export const wrapPageElement = ({ element }) => {
    const Layout = element.type.Layout ?? React.Fragment;

    return <Layout>{element}</Layout>;
};
