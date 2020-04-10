import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
jest.mock('@/helpers/networking');
import Outcome from "@/components/Outcome.vue";
import Vuex from "vuex";
import Vue from "vue";
const localVue = createLocalVue();

localVue.use(Vuex);

describe("Outcome.vue", () => {

  let getters;
  let mutations;
  let store;

  beforeEach(() => {
    getters = {
    }
    mutations = {
    }
    store = new Vuex.Store({
      getters,
      mutations
    })
  })

  var getOutcome = function (outcomeType, hostType) {
    var outcome = shallowMount(Outcome, {
      propsData: {
        outcome: {
          OutcomeType: outcomeType,
          HostType: hostType,
          Uid: 'someUid'
        },
        isOutcomeStatusOpen: true
      },
      store,
      localVue,
    })
    return outcome
  }

  it("creates happy path", async () => {
    const wrapper = getOutcome("Yes / No", "Home")
    expect(wrapper.vm.outcomeName).toBe("Yes")
  })

  it("creates happy path x", async () => {
    const wrapper = getOutcome("Yes / No", "Away")
    expect(wrapper.vm.outcomeName).toBe("No")
  })

  it("creates happy path x2", async () => {
    const wrapper = getOutcome("Over / Under", "Home")
    expect(wrapper.vm.outcomeName).toBe("Over")
  })

  it("creates happy path x2 x", async () => {
    const wrapper = getOutcome("Over / Under", "Away")
    expect(wrapper.vm.outcomeName).toBe("Under")
  })

  it.skip("creates unhappy path", () => {
    const wrapper = getOutcome("Yes / No", "None")
    expect(wrapper.vm.outcomeName).toThrow()
  })

  it("isBetPlacerVisible", async () => {
    const wrapper = getOutcome("Yes / No", "Away")
    expect(wrapper.vm.isBetPlacerVisible).toBe(false)
    wrapper.find('.isBetPlacerVisibleTrigger').trigger('click')
    expect(wrapper.vm.isBetPlacerVisible).toBe(true)
  })

  it("isBetPlacerVisible is set to false if market is not open", async () => {
    const wrapper = getOutcome("Yes / No", "Away")
    wrapper.find('.isBetPlacerVisibleTrigger').trigger('click')
    wrapper.setProps({
      isOutcomeStatusOpen: false
    })
    await Vue.nextTick()
    expect(wrapper.vm.isBetPlacerVisible).toBe(false)
    wrapper.find('.isBetPlacerVisibleTrigger').trigger('click')
    expect(wrapper.vm.isBetPlacerVisible).toBe(false)
  })
})
