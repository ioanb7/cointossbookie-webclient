import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
jest.mock('@/helpers/networking');
import Networking from '@/helpers/networking';
import MainBetting from "@/components/MainBetting.vue";
import Vuex from "vuex";
//import Vue from "vue";
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
    expect(wrapper.vm.$data.Markets).toEqual([])

    wrapper.vm.update({
      Markets: [],
      GameId: 999,
      FixtureState: "fixtureStateSomeValue",
      Score: [1,2,3,4]
    })

    expect(wrapper.vm.$data.GameId).toEqual(999)
    expect(wrapper.vm.$data.FixtureState).toEqual("fixtureStateSomeValue")
    expect(wrapper.vm.$data.Score).toEqual([1,2,3,4])
    expect(wrapper.vm.$data.Markets).toEqual([])
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

  it("marketsToDisplay doesn't display the X-X-X-X-X markets", async () => {
    const wrapper = getMainBetting()
    wrapper.vm.update({
      Markets: [{
        Outcomes: [{
          Uid: 'someUid'
        }],
        MarketType: 'Flip On Exact Order',
        Status: 'SomeStatus'
      }]
    })
    expect(wrapper.vm.marketsToDisplay).toStrictEqual([])
  })

  it("returns correct trueprobability for the X-X-X-X-X markets", async () => {
    const wrapper = getMainBetting()
    wrapper.vm.update({
      Markets: [{
        Outcomes: [{
          Uid: 'someUid',
          TrueProbability: 88
        }],
        MarketType: 'Flip On Exact Order',
        Status: 'Open'
      }]
    })
    expect(wrapper.vm.marketOnExactOrderTrueProbability).toStrictEqual(88)
  })
})
