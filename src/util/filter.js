import { navigate } from 'gatsby';

const config = ['distillery'];

export const decodeString = string => {
    if (!string || typeof string !== 'string') {
        return null;
    }

    string = string.toLowerCase();

    string = string.replace(/ /g, '-');

    const entities = [
        ['amp', '&'],
        ['#038', '&'],
        ['apos', "'"],
        ['#x27', "'"],
        ['#x2F', '/'],
        ['#39', "'"],
        ['#8217', "'"],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"'],
        ['&ndash;', '-'],
        ['#8211', '-'],
        ['shy', ''],
        ['%C3%A5', 'å'],
        ['%C3%A4', 'ä'],
        ['%C3%B6', 'ö'],
    ];
    for (let i = 0, max = entities.length; i < max; ++i) {
        string = string.replace(new RegExp(`&${entities[i][0]};`, 'g'), entities[i][1]);
    }

    return string;
};

export const getParamResults = (allRecipes, search) => {
    const filter = {};

    if (!search) {
        return [allRecipes, filter];
    }

    const urlParams = new URLSearchParams(search);
    const paramKeys = urlParams.keys();

    let filteredRecipes = [];
    let index = 0;

    for (const key of paramKeys) {
        if (!config.includes(key)) {
            continue;
        }

        const values = urlParams.get(key);
        const valuesArray = values.split(',');
        filter[key] = valuesArray;

        const recipes = (index === 0 ? allRecipes : filteredRecipes).filter(recipe =>
            valuesArray.includes(recipe[key])
        );

        index++;
        filteredRecipes = recipes;
    }

    return [filteredRecipes, filter];
};

export const setFilterParams = (value, key, allRecipes, filter) => {
    const decodedValue = decodeString(value);
    const matchedFilter = filter[key];

    if (matchedFilter) {
        const valueIndex = matchedFilter.indexOf(decodedValue);
        if (valueIndex !== -1) {
            if (matchedFilter.length > 1) {
                filter[key].splice(valueIndex, 1);
            } else {
                delete filter[key];
            }
        } else {
            filter[key].push(decodedValue);
        }
    } else {
        filter[key] = [decodedValue];
    }

    let index = 0;
    let filteredRecipes = [];
    const activeFilterKeys = Object.keys(filter);

    if (!activeFilterKeys?.length) {
        navigate('/recept/', {
            replace: true,
            state: {
                disableScrollUpdate: true,
            },
        });

        return [allRecipes, filter];
    }

    activeFilterKeys.forEach(filterKey => {
        const valuesArray = filter[filterKey];
        const recipes = (index === 0 ? allRecipes : filteredRecipes).filter(recipe =>
            valuesArray.includes(recipe[filterKey])
        );

        index++;
        filteredRecipes = recipes;
    });

    let params = '';
    activeFilterKeys.forEach((filterKey, index) => {
        const valueString = filter[filterKey].join(',');
        params += `${index === 0 ? '?' : '&'}${filterKey}=${valueString}`;
    });

    navigate(`/recept/${params}`, {
        replace: true,
        state: {
            disableScrollUpdate: true,
        },
    });

    return [filteredRecipes, filter];
};
