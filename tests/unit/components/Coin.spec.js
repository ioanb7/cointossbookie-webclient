import { shallowMount } from '@vue/test-utils'
import Coin from '@/components/Coin.vue'

describe('Coin.vue', () => {
  var getCoin = function (coinType) {
    return shallowMount(Coin, {
      propsData: {
        coinType
      }
    })
  }

  it('renders head icon', () => {
    const coin = getCoin("head")
    expect(coin.html()).toMatchSnapshot();
  })

  it('renders tail icon', () => {
    const coin = getCoin("tail")
    expect(coin.html()).toMatchSnapshot();
  })

  it('renders none icon', () => {
    const coin = getCoin("")
    expect(coin.html()).toMatchSnapshot();
  })
})
