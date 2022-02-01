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
    if (!search) {
        return allRecipes;
    }

    const urlParams = new URLSearchParams(search);
    const paramKeys = urlParams.keys();

    let filteredRecipes = [];
    let index = 0;
    let state = {};

    for (const key of paramKeys) {
        if (!config.includes(key)) {
            continue;
        }

        const values = urlParams.get(key).split(',');
        let recipes = [];

        values.forEach(value => {
            const filteredByValue = (index === 0 ? allRecipes : filteredRecipes).filter(
                recipe => recipe[key] === value
            );

            recipes = recipes.concat(filteredByValue);
        });

        index++;
        filteredRecipes = recipes;
    }

    return [filteredRecipes];
};
