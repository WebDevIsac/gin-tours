import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import colors from 'config/colors';
import icons from 'src/images/socials';

const Wrapper = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Item = styled('div')`
    width: 48px;
    height: 48px;
`;

const Socials = () => {
    const socials = ['instagram', 'facebook', 'pinterest', 'twitter'];

    return (
        <Wrapper>
            {socials.map((type) => (
                <Item key={type}>
                    <img src={icons[type]} />
                </Item>
            ))}
        </Wrapper>
    );
};

Socials.propTypes = {};

export default Socials;
