import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
jest.mock('@/helpers/networking');
import Networking from '@/helpers/networking';
import MainBetting from "@/components/MainBetting.vue";
import Vuex from "vuex";
import Vue from "vue"
const localVue = createLocalVue();

localVue.use(Vuex);

describe("MainBetting.vue", () => {

  let getters;
  let mutations;
  let store;

  beforeEach(() => {
    getters = {
      getBetsUids: jest.fn().mockReturnValue(['someUid'])
    }
    mutations = {
      settledBets: jest.fn(),
    }
    store = new Vuex.Store({
      getters,
      mutations
    })
  })

  var getMainBetting = function () {
    var mainBetting = shallowMount(MainBetting, {
      propsData: {
      },
      store,
      localVue,
    })
    return mainBetting
  }

  it("networking is called on creation", async () => {
    expect(Networking).not.toHaveBeenCalled();
    // eslint-disable-next-line no-unused-vars
    const wrapper = getMainBetting()
    expect(Networking).toHaveBeenCalledTimes(1);
  })

  it("update happy path", async () => {
    const wrapper = getMainBetting()
    expect(wrapper.vm.hasLoaded).toBe(false)

    wrapper.vm.update({
      Markets: [],
      GameId: 999,
      FixtureState: "fixtureStateSomeValue",
      Score: [1,2,3,4]
    })
    expect(wrapper.vm.hasLoaded).toBe(true)

    expect(wrapper.vm.$data.currentGame.GameId).toEqual(999)
    expect(wrapper.vm.$data.currentGame.FixtureState).toEqual("fixtureStateSomeValue")
    expect(wrapper.vm.$data.currentGame.Score).toEqual([1, 2, 3, 4])
    expect(wrapper.vm.$data.currentGame.Markets).toEqual([])
  })

  it("calls settle lose bet for a bet placed", async () => {
    const wrapper = getMainBetting()
    wrapper.vm.update({
      Markets: [{
        Id: 1,
        Outcomes: [{
          Uid: 'someUid'
        }],
        Status: 'Settled'
      }]
    })
    expect(mutations.settledBets).toHaveBeenCalled()
    expect(mutations.settledBets).toHaveBeenCalledWith({}, [{
      uid: 'someUid',
      won: false
    }])
  })

  it("calls settle win bet for a bet placed", async () => {
    const wrapper = getMainBetting()
    wrapper.vm.update({
      Markets: [{
        Outcomes: [{
          Uid: 'someUid',
          TrueProbability: 1
        }],
        Status: 'Settled'
      }]
    })
    expect(mutations.settledBets).toHaveBeenCalled()
    expect(mutations.settledBets).toHaveBeenCalledWith({}, [{
      uid: 'someUid',
      won: true
    }])
  })

  it("caches data for the next game until confirmed", async () => {
    const wrapper = getMainBetting()
    expect(wrapper.vm.$data.invitationToNextGameIsDisplayed).toBe(false)
    var updateExample = {
      Markets: [{
        Outcomes: [{
          Uid: 'someUid',
          TrueProbability: 0.9
        }],
        Status: 'Open'
      }],
      GameId: 7
    };
    wrapper.vm.update(updateExample)
    expect(wrapper.vm.$data.invitationToNextGameIsDisplayed).toBe(false)

    updateExample.GameId = 8
    wrapper.vm.update(updateExample)

    expect(wrapper.vm.$data.currentGame.GameId).toStrictEqual(7)
    expect(wrapper.vm.$data.invitationToNextGameIsDisplayed).toBe(true)
  })
  
  it("shows an invitation to the next game", async () => {
    const wrapper = getMainBetting()
    var updateExample = {
      Markets: [{
        Outcomes: [{
          Uid: 'someUid',
          TrueProbability: 0.9
        }],
        Status: 'Open'
      }],
      GameId: 7
    };
    wrapper.vm.update(updateExample)

    updateExample.GameId = 8
    wrapper.vm.update(updateExample)
    expect(wrapper.vm.$data.currentGame.GameId).toStrictEqual(7)

    await Vue.nextTick()
    var element = wrapper.find(".nextGame")
    element.trigger('click')
    expect(wrapper.vm.$data.invitationToNextGameIsDisplayed).toBe(false)
    expect(wrapper.vm.$data.currentGame.GameId).toStrictEqual(8)
  })
})