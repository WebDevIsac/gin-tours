import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import colors from 'config/colors';

const Item = styled('div')``;

const SocialItem = ({ item }) => {
    return (
        <Item>
            <span>{item}</span>
        </Item>
    );
};

SocialItem.propTypes = {};

export default SocialItem;
