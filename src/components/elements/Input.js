import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import colors from 'config/colors';

const StyledInput = styled('input')`
    width: 100%;
    height: 40px;
    margin-top: 4px;
    padding: 0 12px;
    font-size: 16px;
    border-radius: 0;
    border: 1px solid ${colors.darkBlue};
    background-color: ${colors.white};
    outline: none;
`;

const Input = ({ type, name, id, placeholder, onChange }) => {
    return <StyledInput type={type} name={name} id={id} placeholder={placeholder} onChange={onChange} />;
};

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.string.isRequired,
};

Input.defaultProps = {
    placeholder: null,
};

export default Input;
