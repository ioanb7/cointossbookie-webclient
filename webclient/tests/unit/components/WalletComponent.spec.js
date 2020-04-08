import { shallowMount, createLocalVue } from "@vue/test-utils";
import WalletComponent from "@/components/WalletComponent.vue";
import Vuex from "vuex";
const localVue = createLocalVue();

localVue.use(Vuex);

describe("WalletComponent.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      getWallet: () => 99,
    }
    store = new Vuex.Store({
      actions,
    })
  })

  var getWallet = function () {
    return shallowMount(WalletComponent, {
      store,
      localVue,
    })
  }

  it("renders correct ammount", () => {
    const wrapper = getWallet()
    expect(wrapper.text()).toContain("99io")
  })
})
