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
    padding: 0 16px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    flex-wrap: wrap;
`;

const ClearButton = styled('button')`
    color: ${colors.blue};
    background: ${colors.white};
    border: 1px solid ${colors.blue};
`;

const MobileClearButton = styled(ClearButton)`
    padding: 10px 12px;
    width: 50%;
    font-size: 18px;
    margin-bottom: 8px;
    ${above.md} {
        display: none;
    }
`;

const DesktopClearButton = styled(ClearButton)`
    display: none;
    font-size: 20px;
    padding: 12px;
    position: absolute;
    left: calc(50% + 30% + 15px);

    ${above.md} {
        display: block;
    }

    ${above.lg} {
        left: calc(50% + 25% - 20px);
    }

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
    const filteredTypes = selectedType
        ? allTypes
        : allTypes.filter(type => availableFilters.types.includes(type.value));

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
                <>
                    <MobileClearButton className="mobile" type="button" onClick={handleClear}>
                        Rensa Filter
                    </MobileClearButton>
                    <DesktopClearButton type="button" onClick={handleClear}>
                        X
                    </DesktopClearButton>
                </>
            )}
        </Wrapper>
    );
};

Filter.propTypes = {
    allDistilleries: PropTypes.array,
    allTypes: PropTypes.array,
    availableFilters: PropTypes.arrayOf(PropTypes.string),
    filters: PropTypes.object,
    handleClear: PropTypes.func,
    handleFilter: PropTypes.func,
};

Filter.defaultProps = {
    allDistilleries: [],
    allTypes: [],
    availableFilters: [],
    filters: {},
    handleClear: () => null,
    handleFilter: () => null,
};

export default Filter;
