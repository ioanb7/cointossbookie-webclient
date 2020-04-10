import {
  shallowMount,
} from "@vue/test-utils";
jest.mock('@/helpers/networking');
import ScoreBoard from "@/components/ScoreBoard.vue";

describe("ScoreBoard.vue", () => {
  var getScoreBoard = function () {
    var score = shallowMount(ScoreBoard, {
      propsData: {
      }
    })
    return score
  }

  it('works', () => {
    getScoreBoard()
  })
})
