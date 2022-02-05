import { navigate } from 'gatsby';

const config = ['destilleri', 'gin-typ'];

export const getParamFilter = path => {
    const splittedPath = path.split('/');
    const indices = config.map(conf => splittedPath.indexOf(conf)).filter(index => index !== -1);

    const filter = {};
    indices.forEach(index => {
        if (splittedPath[index + 1]) {
            filter[splittedPath[index]] = splittedPath[index + 1]?.replace(':', '');
        }
    });

    return filter;
};

export const setFilterParams = (value, currentKey, filter) => {
    const encodedValue = value.toLowerCase().replace(/ /g, '-');

    if (filter[currentKey] === encodedValue) {
        delete filter[currentKey];
    } else {
        filter[currentKey] = encodedValue;
    }
    const filterKeys = Object.keys(filter || {})
        .filter(key => config.includes(key))
        .sort((a, b) => config.indexOf(a) - config.indexOf(b));
    let paramQuery = '';

    filterKeys.map(key => {
        paramQuery += `${key}/:${filter[key]}/`;
    });

    navigate(`/recept/${paramQuery}`, {
        replace: true,
        state: {
            disableScrollUpdate: window.scrollY > 83,
        },
    });

    return filter;
};
