import {
  shallowMount,
} from "@vue/test-utils";
jest.mock('@/helpers/networking');
import MarketGroup from "@/components/MarketGroup.vue";

describe("MarketGroup.vue", () => {
  var getMarketGroup = function () {
    var score = shallowMount(MarketGroup, {
      propsData: {
      },
    })
    return score
  }

  it('works', () => {
    getMarketGroup()
  })
})
