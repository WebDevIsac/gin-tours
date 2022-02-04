import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { above, hover } from 'util/mediaqueries';
import colors from 'config/colors';
import Dropdown from 'components/Dropdown';

const Wrapper = styled('div')`
    position: sticky;
    top: 92px;
    width: 100%;
    height: 66px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ClearButton = styled('button')`
    padding: 14px;
    font-size: 20px;
    color: ${colors.blue};
    background: ${colors.white};
    border: 1px solid ${colors.blue};
    margin-left: 12px;

    ${hover} {
        transition: all 200ms ease;
        &:not(.selected):hover {
            color: ${colors.white};
            background-color: ${colors.blue};
        }
    }
`;

const Filter = ({ allDistilleries, allTypes, availableFilters, filters, handleFilter, handleClear }) => {
    const selectedDistillery = filters['destilleri'];
    const selectedType = filters['gin-typ'];

    const filteredDistilleries = selectedDistillery
        ? allDistilleries
        : allDistilleries.filter(distillery => availableFilters.distilleries.includes(distillery.value));
    console.log(filteredDistilleries);
    const filteredTypes = selectedType
        ? allTypes
        : allTypes.filter(type => availableFilters.types.includes(type.value));
    console.log(filteredTypes);

    const hasActiveFilter = !!Object.keys(filters || {})?.length;

    return (
        <Wrapper>
            <Dropdown
                index="destilleri"
                selected={selectedDistillery}
                data={filteredDistilleries}
                onSelect={handleFilter}
            />
            <Dropdown index="gin-typ" selected={selectedType} data={filteredTypes} onSelect={handleFilter} />
            {hasActiveFilter && (
                <ClearButton type="button" onClick={handleClear}>
                    X
                </ClearButton>
            )}
        </Wrapper>
    );
};

Filter.propTypes = {
    filters: PropTypes.object,
};

Filter.defaultProps = {
    filters: {},
};

export default Filter;
