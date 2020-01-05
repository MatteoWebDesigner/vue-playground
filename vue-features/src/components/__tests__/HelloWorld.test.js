import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Component from "../HelloWorld.vue";
import movieAPI from "../../service/movieAPI.js";

jest.mock("../../service/movieAPI.js", () => {
  return {
    buyMovieAPI: jest.fn(() => Promise.resolve("test"))
  };
});

let wrapper;

let wrapperObject = {
  get propTextElm() {
    return wrapper.find("[data-qa=prop-text]");
  },
  get counterElm() {
    return wrapper.find("[data-qa=counter]");
  },
  get counterIncrementElm() {
    return wrapper.find("[data-qa=counter-increment]");
  },
  get counterDecrementElm() {
    return wrapper.find("[data-qa=counter-decrement]");
  },
  getBuyButtonElm() {
    return wrapper.find("[data-qa=buy]");
  }
};

describe("HelloWorld", () => {
  beforeEach(() => {
    wrapper = shallowMount(Component);
  });

  test("should renders correctly prop text", () => {
    let { propTextElm } = wrapperObject;

    wrapper.setProps({ property: "mocked value" });

    expect(propTextElm.text()).toBe("prop: mocked value");
  });

  describe("counter", () => {
    test("should render correctly the initial count value", () => {
      let { counterElm } = wrapperObject;

      expect(counterElm.text()).toBe("0");
    });

    test("should increment count value", async () => {
      let { counterIncrementElm, counterElm } = wrapperObject;

      counterIncrementElm.trigger("click");

      await Vue.nextTick();

      expect(counterElm.text()).toBe("1");
    });

    test("should NOT decrement count value when it is 0", async () => {
      let { counterElm, counterDecrementElm } = wrapperObject;

      counterDecrementElm.trigger("click");

      await Vue.nextTick();

      expect(counterElm.text()).toBe("0");
    });

    test("should decrement when count value it is bigger than 0", async () => {
      let {
        counterIncrementElm,
        counterElm,
        counterDecrementElm
      } = wrapperObject;

      counterIncrementElm.trigger("click");

      await Vue.nextTick();

      expect(counterElm.text()).toBe("1");

      counterDecrementElm.trigger("click");

      await Vue.nextTick();

      expect(counterElm.text()).toBe("0");
    });

    test("should not have buy button if count is 0", async () => {
      let { getBuyButtonElm, counterElm } = wrapperObject;

      expect(counterElm.text()).toBe("0");

      expect(getBuyButtonElm().exists()).toBe(false);
    });

    test("should buy movie if count is greater than 0", async () => {
      let { counterIncrementElm, getBuyButtonElm, counterElm } = wrapperObject;

      counterIncrementElm.trigger("click");

      await Vue.nextTick();

      expect(counterElm.text()).toBe("1");

      getBuyButtonElm().trigger("click");

      await Vue.nextTick();

      expect(movieAPI.buyMovieAPI).toHaveBeenCalledWith("123", 1);
      expect(wrapper.emitted().onPurchase.length).toBe(1);
      expect(wrapper.emitted().onPurchase[0]).toEqual(["123"]);
    });
  });
});
