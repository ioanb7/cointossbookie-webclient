import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
import Score from "@/components/Score.vue";
import Vuex from "vuex";
const localVue = createLocalVue();

localVue.use(Vuex);

describe("Score.vue", () => {

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

  var getScore = function (item) {
    var score = shallowMount(Score, {
      propsData: {
        item
      },
      store,
      localVue,
    })
    return score
  }

  it('works home/heads', () => {
    const score = getScore('Home')
    expect(score.vm.coinType).toEqual("heads")
  })

  it('works away/tails', () => {
    const score = getScore('Away')
    expect(score.vm.coinType).toEqual("tails")
  })

  it('works none', () => {
    const score = getScore('None')
    expect(score.vm.coinType).toEqual("")
  })
})
