import { shallowMount, createLocalVue } from "@vue/test-utils";
import BetPlacer from "@/components/BetPlacer.vue";
import Vuex from "vuex";
import flushPromises from 'flush-promises';
const localVue = createLocalVue();
import FakeValidationProvider from './FakeValidationProvider';
localVue.directive('focus', () => {})
localVue.use(Vuex);
describe("BetPlacer.vue", () => {

  let getWalletFn = jest.fn().mockReturnValue(100)
  let getters;
  let mutations;
  let store;

  let currentGameFn = jest.fn().mockReturnValue({
    Markets: []
  })

  beforeEach(() => {
    getters = {
      getWallet: getWalletFn,
      currentGame: currentGameFn
    }
    mutations = {
      placeBet: jest.fn(),
      cancelBetPlacer: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      mutations
    })
  })

  var getBetPlacer = function () {
    var betPlacer = shallowMount(BetPlacer, {
      propsData: {
        price: 10,
        outcomeUid: 'someUid'
      },
      stubs: {
        ValidationProvider: FakeValidationProvider
      },
      store,
      localVue,
    })
    return betPlacer
  }

  var setBetValue = async function(betPlacer, value) {
    betPlacer.setData({
      'betValue': value
    })
    await flushPromises()
  }

  it("renders correct amount", async () => {
    const wrapper = getBetPlacer()
    await setBetValue(wrapper, 2)
    expect(wrapper.find('.estimated-winnings').text()).toEqual("22.00io")
  })

  it("placeMyBet happy path", async () => {
    const wrapper = getBetPlacer()
    await setBetValue(wrapper, 2)
    const element = wrapper.find('.placeMyBet');
    wrapper.html() // ?
    element.trigger('click')
    expect(mutations.placeBet).toHaveBeenCalledTimes(1)
    expect(mutations.placeBet).toBeCalledWith({}, {
      uid: 'someUid',
      betValue: 2,
      winnings: 22
    })
  })

  it("canPlaceBet happy path", () => {
    const wrapper = getBetPlacer()
    expect(wrapper.vm.canPlaceBet(10)).toBe(true)
    expect(wrapper.vm.canPlaceBet(-1)).toBe(false)
    expect(wrapper.vm.canPlaceBet(500)).toBe(false)
  })

  it("placeableBetValues happy path", () => {
    const wrapper = getBetPlacer()
    expect(wrapper.vm.placeableBetValues).toStrictEqual([1, 2, 5, 10, 20, 50, 100])
  })

  it("placeableBetValues happy path", () => {
    let outcome = {
      Uid: "someUid"
    }
    currentGameFn.mockReturnValue({
      Markets: [
        {
          Outcomes: [
            outcome
          ]
        }
      ]
    })

    const wrapper = getBetPlacer()
    expect(wrapper.vm.outcome).toBe(outcome)
  })

  it("exit calls store cancel bet placer", () => {
    const wrapper = getBetPlacer()
    expect(mutations.cancelBetPlacer).toHaveBeenCalledTimes(0)
    wrapper.vm.exit()
    expect(mutations.cancelBetPlacer).toHaveBeenCalledTimes(1)
  })
})
