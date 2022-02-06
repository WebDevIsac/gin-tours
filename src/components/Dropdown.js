import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { above, hover } from 'util/mediaqueries';
import colors from 'config/colors';
import Arrow from 'components/icons/Arrow';

const Wrapper = styled('div')`
    position: relative;
    width: calc(50% - 8px);
    height: 38px;
    margin-bottom: 8px;

    &:not(:last-of-type) {
        margin-right: 8px;
    }

    ${above.md} {
        height: 42px;
        width: 30%;
        margin-bottom: 0;

        &:not(:last-of-type) {
            margin-right: 16px;
        }
    }

    ${above.lg} {
        width: calc(25% - 36px);
    }
`;

const InnerWrapper = styled('div')`
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: max-height 300ms ease;
    max-height: 38px;
    width: 100%;
    border-bottom: 1px solid ${colors.blue};
    background-color: ${colors.white};

    ${above.md} {
        max-height: 42px;
    }

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
    padding: 10px;
    font-size: 18px;
    line-height: 1em;
    color: ${colors.blue};
    background: ${colors.white};
    border: 1px solid ${colors.blue};
    user-select: none;
    cursor: pointer;
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;

    ${above.md} {
        font-size: 20px;
        line-height: 1em;
        padding: 12px;
    }

    &.selected {
        color: ${colors.white};
        background-color: ${colors.blue};
    }
`;

const Select = styled(Trigger)`
    display: block;
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

const Span = styled('label')`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const ArrowWrapper = styled('div')`
    height: 20px;
    & > svg {
        width: 16px;
        height: 16px;
    }

    ${above.md} {
        & > svg {
            width: 20px;
            height: 20px;
        }
    }
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
                <Trigger
                    type="button"
                    className={!isOpen && selectedLabel ? 'selected' : ''}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Span>{(!isOpen && selectedLabel) || `Välj ${index}`}</Span>
                    <ArrowWrapper>
                        <Arrow
                            color={!isOpen && selectedLabel ? colors.white : colors.blue}
                            direction={isOpen ? 'up' : 'down'}
                        />
                    </ArrowWrapper>
                </Trigger>
                <InnerDropdown>
                    {data.map(({ label, value }) => (
                        <Select
                            type="button"
                            key={value}
                            className={selected === value ? 'selected' : ''}
                            value={value}
                            onClick={handleSelect}
                        >
                            <Span>{label}</Span>
                        </Select>
                    ))}
                </InnerDropdown>
            </InnerWrapper>
        </Wrapper>
    );
};

Dropdown.propTypes = {
    data: PropTypes.array,
    index: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.string,
};

Dropdown.defaultProps = {
    data: [],
    index: '',
    selected: '',
};

export default Dropdown;
