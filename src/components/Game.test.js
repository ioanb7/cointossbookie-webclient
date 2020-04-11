import {
  shallowMount,
} from "@vue/test-utils";
jest.mock('@/helpers/networking');
import Game from "@/components/Game.vue";

describe("Game.vue", () => {
  var getGame = function () {
    var game = shallowMount(Game, {
      propsData: {
        markets: [],
        gameId: 0,
        fixtureState: "",
        score: []
      },
    })
    return game
  }

  it("marketsToDisplay doesn't display the X-X-X-X-X markets", async () => {
    const wrapper = getGame()
    wrapper.setProps({
      markets: [{
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
    const wrapper = getGame()
    wrapper.setProps({
      markets: [{
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
