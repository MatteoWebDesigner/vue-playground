/**
 * Returns the chart data in categories
 * @param {array} collectionProperties - ["color", "region"]
 * @param {array} collection - [
        {
            color: "green",
            region: "Liguria"
        }, 
        { ... }
    ]
 * 
 * @returns {object} - {
        color: {
            x: ["green", "red"],
            y: [ 2,       4   ]
        }
        region: [ ... ]
    }
 */
function transformOliveDataToCategoriesChartData(
    collectionProperties,
    collection
) {
    let categories = {};
    let categoriesChartData = {};

    collectionProperties.forEach(property => {
        collection.forEach(oliveTree => {
            let propertyValue = oliveTree[property];

            if (!categories[property]) {
                categories[property] = {};
            }

            let categoryProperty = categories[property];

            if (!categoryProperty[propertyValue]) {
                categoryProperty[propertyValue] = 1;
            } else {
                categoryProperty[propertyValue]++;
            }
        });
    });

    collectionProperties.forEach(property => {
        let category = categories[property];

        let x = Object.keys(category);
        let y = Object.values(category);

        categoriesChartData[property] = {
            x,
            y
        };
    });

    return categoriesChartData;
}

export {
    transformOliveDataToCategoriesChartData
};