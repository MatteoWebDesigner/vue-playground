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
import { transformOliveDataToCategoriesChartData } from "./transformOliveDataToCategoriesChartData.js";

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

let collectionProperties = propertiesTypes.map(option => option.value);

export default {
  name: "app",
  components: {
    Plotly
  },
  data() {
    return {
      propertySelected: propertiesTypes[0].value,
      propertiesTypes,
      categoriesData: {},
      layout: {
        title: "Olive tree"
      }
    };
  },

  computed: {
    chartData() {
      let { x, y } = this.categoriesData[this.propertySelected] || {
        x: [],
        y: []
      };

      return [
        {
          x,
          y,
          type: "bar"
        }
      ];
    }
  },

  mounted() {
    this.boostrapChart();
  },

  methods: {
    getOliveData() {
      let promise = import("./data/oliveData.js");

      return promise;
    },

    changePropertySelected(event) {
      this.propertySelected = event.target.value;
    },

    boostrapChart() {
      this.getOliveData().then(data => {
        this.categoriesData = transformOliveDataToCategoriesChartData(
          collectionProperties,
          data.default
        );
      });
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
