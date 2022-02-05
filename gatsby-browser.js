import React from 'react';

export const wrapPageElement = ({ element }) => {
    const Layout = element.type.Layout ?? React.Fragment;

    return <Layout>{element}</Layout>;
};

export const shouldUpdateScroll = ({ routerProps }) => {
    const { disableScrollUpdate } = routerProps.location.state || {};

    return !disableScrollUpdate;
};

// Focus back on input field after navigation
// export const onRouteUpdate = loc => {
//     const { state } = loc.location;

//     if (state && state.refocusId) {
//         const el = document.getElementById(state.refocusId);

//         if (el) {
//             el.focus();
//         }
//     }
// };
