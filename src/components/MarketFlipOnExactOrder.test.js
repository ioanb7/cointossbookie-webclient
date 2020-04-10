import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
jest.mock('@/helpers/networking');
import MarketFlipOnExactOrder from "@/components/MarketFlipOnExactOrder.vue";
import Vuex from "vuex";
import Vue from "vue";
const localVue = createLocalVue();

localVue.use(Vuex);

describe("MarketFlipOnExactOrder.vue", () => {

  let getters;
  let mutations;
  let store;

  beforeEach(() => {
    getters = {}
    mutations = {}
    store = new Vuex.Store({
      getters,
      mutations,
    })
  })

  var getMarketFlipOnExactOrder = function (scoreSoFar) {
    var marketFlipOnExactOrder = shallowMount(MarketFlipOnExactOrder, {
      propsData: {
        scoreSoFar: scoreSoFar || [],
        trueProbability: 2,
        gameId: 99
      },
      store,
      localVue
    })
    return marketFlipOnExactOrder
  }

  it("creates happy path", () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = getMarketFlipOnExactOrder()
  })

  it("initial host types works", async () => {
    const wrapper = getMarketFlipOnExactOrder([{
      'val': 'Away'
    }, {
      'val': 'Away'
    }, {
      'val': 'Away'
    }])
    expect(wrapper.vm.hostTypes[0].val).toEqual('Away')
    expect(wrapper.vm.hostTypes[1].val).toEqual('Away')
    expect(wrapper.vm.hostTypes[2].val).toEqual('Away')
  })

  it("changes the can change based on watch changes for the score", async () => {
    const wrapper = getMarketFlipOnExactOrder()
    expect(wrapper.vm.hostTypes[0].canChange).toBe(true)
    expect(wrapper.vm.hostTypes[1].canChange).toBe(true)
    wrapper.setProps({
      scoreSoFar: [{
        'id': 0,
        'val': 'Away'
      }]
    })
    await Vue.nextTick()
    expect(wrapper.vm.hostTypes[0].canChange).toBe(false)
    expect(wrapper.vm.hostTypes[1].canChange).toBe(true)
  })

  it("throws for invalid score id", async () => { // TODO: should this really be here?
    const wrapper = getMarketFlipOnExactOrder()
    wrapper.setProps({
      scoreSoFar: [{
        'id': -3,
        'val': 'Away'
      }]
    })
    //
    jest.spyOn(global.console, 'error').mockImplementation((e) => {
      if (e.toString().includes("TypeError: Cannot set property '_error' of undefined"))
        return;
      expect(e.toString()).toContain("Couldn't find host type in props for val -3")
    });
    await Vue.nextTick()
    jest.spyOn(global.console, 'error').mockRestore()
  })

  it("flip works", () => {
    const wrapper = getMarketFlipOnExactOrder()
    expect(wrapper.vm.hostTypes[0].val).toEqual('Home')
    wrapper.vm.flip(0)
    expect(wrapper.vm.hostTypes[0].val).toEqual('Away')
  })

  it("can change works", () => {
    const wrapper = getMarketFlipOnExactOrder()
    expect(wrapper.vm.canChange(0)).toBe(true)
    expect(wrapper.vm.canChange(4)).toBe(true)

    expect(() => wrapper.vm.canChange(-1)).toThrow()
    expect(() => wrapper.vm.canChange(5)).toThrow()
  })

  it("outcome uid is not empty (bad test)", () => {
    const wrapper = getMarketFlipOnExactOrder()
    expect(wrapper.vm.outcomeUid).not.toBe("")
  })
})
