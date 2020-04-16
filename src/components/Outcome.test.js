import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
import Outcome from "@/components/Outcome.vue";
import Vuex from "vuex";
import Vue from "vue";
const localVue = createLocalVue();

localVue.use(Vuex);

describe("Outcome.vue", () => {

  let getters;
  let mutations = {
    addOrReplaceBetPlacer: jest.fn()
  }
  let store;

  beforeEach(() => {
    getters = {
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

  it("isBetPlacerVisible", async () => {
    const wrapper = getOutcome("Yes / No", "Away")
    mutations // ?
    expect(mutations.addOrReplaceBetPlacer).not.toHaveBeenCalled()
    wrapper.find('.openBetPlacer').trigger('click')
    expect(mutations.addOrReplaceBetPlacer).toHaveBeenCalled()
  })

  it("isBetPlacerVisible is set to false if market is not open", async () => {
    const wrapper = getOutcome("Yes / No", "Away")
    wrapper.find('.openBetPlacer').trigger('click')
    wrapper.setProps({
      isOutcomeStatusOpen: false
    })
    await Vue.nextTick()
    expect(wrapper.classes()).toContain("statusNotOpen")
    expect(wrapper.classes()).not.toContain("statusOpen")
  })
})
