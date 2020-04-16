import {
  shallowMount,
  createLocalVue,
} from "@vue/test-utils";
import MarketGroup from "@/components/MarketGroup.vue";
import Vue from "vue";
import Vuex from "vuex";
const localVue = createLocalVue();

localVue.use(Vuex);
describe("MarketGroup.vue", () => {
   let getters;
   let mutations;
   let store;

   beforeEach(() => {
     getters = {
       allBetPlacers: jest.fn().mockReturnValue([{
         marketType: "someMarketType"
       }])
     }
     store = new Vuex.Store({
       getters,
       mutations,
     })
   })

  var getMarketGroup = function () {
    var score = shallowMount(MarketGroup, {
      getters: {
        allBetPlacers() {
          return []
        }
      },
      propsData: {
      },
      store,
      localVue,
    })
    return score
  }
  
  it('works', () => {
    getMarketGroup()
  })

  it('changes bet placer when the store sets one', async () => {
    let marketGroup = getMarketGroup()
    await Vue.nextTick()
    expect(marketGroup.betPlacer).not.toBeNull()
  })
})
