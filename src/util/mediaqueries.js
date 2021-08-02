const breakpoints = ['375px', '768px', '1024px', '1440px'];
const labels = ['sm', 'md', 'lg', 'xl'];

const breakpointMap = breakpoints.reduce((arr, size, index) => {
    return [
        ...arr,
        {
            label: labels[index],
            size,
        },
    ];
}, []);

const getMaxValue = label => {
    if (label === null) {
        return;
    }

    const breakpointValue = typeof label === 'object' ? label.size : breakpointMap.find(bp => bp.label === label).size;
    const postfix = breakpointValue.match(/[a-zA-Z]+/) || '';
    const value = parseInt(breakpointValue, 10);

    return `${value - 1}${postfix}`;
};

const above = breakpointMap.reduce((obj, bp) => {
    return {
        ...obj,
        [bp.label]: `@media (min-width: ${bp.size})`,
    };
}, {});

const below = breakpointMap.reduce((obj, bp) => {
    return {
        ...obj,
        [bp.label]: `@media (max-width: ${getMaxValue(bp.label)})`,
    };
}, {});

const hover = '@media (hover: hover), (-ms-high-contrast: none)';

export { above, below, hover };
