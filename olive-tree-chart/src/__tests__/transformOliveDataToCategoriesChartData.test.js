import {
    transformOliveDataToCategoriesChartData
} from "../transformOliveDataToCategoriesChartData.js";

describe("transformOliveDataToCategoriesChartData", () => {
    describe("transformOliveDataToCategoriesChartData()", () => {
        test("should output a data comaptible with the chart library", () => {
            const inputPropertiesList = ["texture", "flavor"];
            const inputData = [{
                    texture: "uniform",
                    flavor: "sweat"
                },
                {
                    texture: "partially uniform",
                    flavor: "sweat"
                },
                {
                    texture: "partially uniform",
                    flavor: "bitter"
                }
            ];

            const output = transformOliveDataToCategoriesChartData(
                inputPropertiesList,
                inputData
            );

            const expectedOutput = {
                flavor: {
                    x: ["sweat", "bitter"],
                    y: [2, 1]
                },
                texture: {
                    x: ["uniform", "partially uniform"],
                    y: [1, 2]
                }
            };

            expect(output).toEqual(expectedOutput);
        });
    });
});