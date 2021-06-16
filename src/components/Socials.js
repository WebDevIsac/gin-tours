import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import colors from 'config/colors';
import SocialItem from './SocialItem';

const Wrapper = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Socials = () => {
    const socials = ['instagram', 'facebook', 'pinterest', 'twitter'];

    return (
        <Wrapper>
            {socials.map((social) => (
                <SocialItem item={social} />
            ))}
        </Wrapper>
    );
};

Socials.propTypes = {};

export default Socials;
