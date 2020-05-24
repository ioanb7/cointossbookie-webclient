import {
  shallowMount,
} from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
  var getHeader = function () {
    var score = shallowMount(Header, {
      propsData: {
      }
    })
    return score
  }

  it('works', () => {
    getHeader()
  })
})
