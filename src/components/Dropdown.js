import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { above, hover } from 'util/mediaqueries';
import colors from 'config/colors';
import Arrow from 'components/icons/Arrow';

const Wrapper = styled('div')`
    position: relative;
    width: 20%;
    height: 46px;

    &:not(:last-of-type) {
        margin-right: 12px;
    }
`;

const InnerWrapper = styled('div')`
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: max-height 300ms ease;
    max-height: 42px;
    width: 100%;
    border-bottom: 1px solid ${colors.blue};
    background-color: ${colors.white};

    &.open {
        max-height: 240px;
    }
`;

const InnerDropdown = styled('div')`
    overflow: scroll;
    width: 100%;
`;

const Trigger = styled('button')`
    position: relative;
    width: 100%;
    text-align: center;
    padding: 12px;
    font-size: 20px;
    color: ${colors.blue};
    background: ${colors.white};
    border: 1px solid ${colors.blue};
    user-select: none;
    cursor: pointer;
    text-transform: capitalize;

    &.selected {
        color: ${colors.white};
        background-color: ${colors.blue};
    }
`;

const Select = styled(Trigger)`
    border-bottom: none;
    &:first-of-type {
        border-top: none;
    }

    ${hover} {
        transition: all 200ms ease;
        &:not(.selected):hover {
            color: ${colors.white};
            background-color: ${colors.blue}AA;
        }
    }
`;

const Label = styled('span')`
    font-size: 20px;
    line-height: 1em;
`;

const ArrowWrapper = styled('div')`
    position: absolute;
    top: 10px;
    right: 12px;
`;

const Dropdown = ({ data, selected, index, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = e => {
        const value = e.target.value;
        onSelect(value, index);
    };

    const selectedLabel = data.find(({ value }) => value === selected)?.label;

    return (
        <Wrapper>
            <InnerWrapper className={isOpen ? 'open' : ''}>
                <Trigger className={!isOpen && selectedLabel ? 'selected' : ''} onClick={() => setIsOpen(!isOpen)}>
                    <Label>{(!isOpen && selectedLabel) || `Välj ${index}`}</Label>
                    <ArrowWrapper>
                        <Arrow
                            color={!isOpen && selectedLabel ? colors.white : colors.blue}
                            direction={isOpen ? 'up' : 'down'}
                            width="20px"
                            height="20px"
                        />
                    </ArrowWrapper>
                </Trigger>
                <InnerDropdown>
                    {data.map(({ label, value }) => (
                        <Select
                            key={value}
                            className={selected === value ? 'selected' : ''}
                            value={value}
                            onClick={handleSelect}
                        >
                            {label}
                        </Select>
                    ))}
                </InnerDropdown>
            </InnerWrapper>
        </Wrapper>
    );
};

export default Dropdown;
