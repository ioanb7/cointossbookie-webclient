import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
jest.mock('@/helpers/networking');
import Market from "@/components/Market.vue";
import Vuex from "vuex";
const localVue = createLocalVue();

localVue.use(Vuex);

describe("Market.vue", () => {

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

  var getMarket = function (handicap) {
    var market = shallowMount(Market, {
      propsData: {
        market: {
          Handicap: handicap || 0
        }
      },
      store,
      localVue,
    })
    return market
  }

  it("creates happy path", async () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = getMarket()
  })

  it("creates happy path", async () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = getMarket(0.5)
  })
})
