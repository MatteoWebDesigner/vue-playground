<template>
  <div id="app">
    <select @change="changePropertySelected" v-model="propertySelected">
      <option
        v-for="property in propertiesTypes"
        :value="property.value"
        :key="property.value"
        >{{ property.label }}
      </option>
    </select>
    <Plotly
      :data="chartData"
      :layout="layout"
      :display-mode-bar="false"
    ></Plotly>
  </div>
</template>

<script>
import { Plotly } from "vue-plotly";

let propertiesTypes = [
  {
    value: "color",
    label: "color"
  },
  {
    value: "originRegion",
    label: "region"
  }
];

function convertDataToCategories(collection) {
  let collectionProperties = propertiesTypes.map(option => option.value);

  let categories = {};

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

  return categories;
}

export default {
  name: "app",
  components: {
    Plotly
  },
  data() {
    return {
      propertySelected: propertiesTypes[0].value,
      propertiesTypes,
      categoriesData: [],
      chartData: [
        {
          x: [],
          y: [],
          type: "bar"
        }
      ],
      layout: {
        title: "Olive tree"
      }
    };
  },

  mounted() {
    this.boostrapChart();
  },

  methods: {
    getOliveData() {
      let promise = import("./data/oliveData.js");

      return promise;
    },

    selectCategoryData(value) {
      let category = this.categoriesData[value];

      let x = Object.keys(category);
      let y = Object.values(category);

      return { x, y };
    },

    changePropertySelected(event) {
      this.propertySelected = event.target.value;
    },

    updateChart(x, y) {
      this.chartData = [
        {
          x,
          y,
          type: "bar"
        }
      ];
    },

    boostrapChart() {
      this.getOliveData().then(data => {
        this.categoriesData = convertDataToCategories(data.default);
      });
    },

    onDataChartChange() {
      let { x, y } = this.selectCategoryData(this.propertySelected);
      this.updateChart(x, y);
    }
  },

  watch: {
    categoriesData: function() {
      this.onDataChartChange();
    },
    propertySelected: function() {
      this.onDataChartChange();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
