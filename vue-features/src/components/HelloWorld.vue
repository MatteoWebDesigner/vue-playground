<template>
  <div class="hello">
    <p>{{ simpleData }}</p>

    <button @click="addReactiveData">add data</button>
    <p>{{ reactiveData.value }}</p>

    <ul>
      <li v-for="item in list" :key="item.key">
        {{ item.name }}, {{ item.count }}
      </li>
    </ul>
    <label>
      index:
      <input
        type="number"
        min="0"
        :max="list.length - 1"
        v-model="listItemSelectedIndex"
      />
    </label>

    <label
      >value:
      <input
        type="text"
        @change="updateListItem"
        :value="list[listItemSelectedIndex].name"
    /></label>

    <p>{{ full_name }}</p>

    <p v-if="countWatchChanges">
      previous value: {{ dataWatchedPreviewsValue }}
    </p>
    <p>{{ dataWatched.value }} {{ countWatchChanges }}</p>
    <input type="text" @change="triggerWatch" />

    <div class="scroll-view">
      <div v-for="(log, index) in logs" :key="index">{{ log }}</div>
    </div>

    <p>prop: {{ property }}</p>

    <div ref="unsafeHTML"></div>
  </div>
</template>

<script>
let logs = [];

export default {
  name: "HelloWorld",
  props: {
    property: {
      type: String,
      default: "something"
    }
  },
  data: () => {
    return {
      simpleData: "sample data",
      reactiveData: {},
      listItemSelectedIndex: 0,
      list: [
        { name: "pear", count: 2, key: 2 },
        { name: "apple", count: 1, key: 1 },
        { name: "banana", count: 4, key: 3 }
      ],
      logs,
      name: "Matteo",
      surname: "Gilardoni",
      dataWatched: {
        value: "I am beign watched 🧐"
      },
      dataWatchedPreviewsValue: "",
      countWatchChanges: 0
    };
  },
  beforeCreate() {
    logs.push("beforeCreate");
  },
  created() {
    logs.push("created");
  },
  beforeMount() {
    logs.push("beforeMount");
  },
  mounted() {
    logs.push("mounted");

    let element = document.createTextNode("some imperative 🤴🏻 text");

    this.$refs.unsafeHTML.append(element);
  },
  beforeUpdate() {
    // it will keep triggering the update
    // logs.push("beforeUpdate");
  },
  updated() {
    // it will keep triggering the update
    // logs.push("nextTick");

    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
      // logs.push("nextTick");
    });
  },
  computed: {
    full_name() {
      return this.name + " " + this.surname;
    }
  },
  watch: {
    dataWatched: {
      deep: true,

      // We have to move our method to a handler field
      handler(newValue, oldValue) {
        this.dataWatchedPreviewsValue = oldValue.value;

        this.countWatchChanges++;
      }
    }
  },
  methods: {
    addReactiveData() {
      // it will not work becayse value was not "reactify"
      // this.reactiveData.value = "reactive data";
      this.$set(this.reactiveData, "value", "reactive data");
    },
    updateListItem($event) {
      let item = this.list[this.listItemSelectedIndex];
      item.name = $event.target.value;
    },
    triggerWatch($event) {
      this.dataWatched = { value: $event.target.value }; // if you do not change the reference you have issue to retrieve the old value on watch
    },
    updateLogs() {},
    getLogs() {
      return logs;
    }
  }
};
</script>

<style scoped>
.scroll-view {
  max-height: 200px;
  overflow: scroll;
}
</style>
