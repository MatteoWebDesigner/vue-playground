import { shallowMount } from "@vue/test-utils";
import Component from "../HelloWorld.vue";

let wrapper;

describe("HelloWorld", () => {
  beforeEach(() => {
    wrapper = shallowMount(Component);
  });

  it("renders correctly with different props", () => {
    let text = wrapper.find("button").text();

    expect(text).toBe("add data");
  });
});
