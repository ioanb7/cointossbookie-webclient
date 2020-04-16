import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
import MainBetting from "@/components/MainBetting.vue";
import Vuex from "vuex";
import Vue from "vue"
const localVue = createLocalVue();

import {
  Store
} from 'vuex-mock-store'

localVue.use(Vuex);

// Note: store.reset will fail until my PR for vuex-mock-store goes through. skipped the last test.
// https://github.com/posva/vuex-mock-store/pull/75

describe("MainBetting.vue", () => {
  var game = {
    Markets: [],
    GameId: 999,
    FixtureState: "fixtureStateSomeValue",
    Score: [1, 2, 3, 4]
  }

  const store = new Store({
    state: {
    },
    getters: {
      allGames: {
        999: game
      },
      latestGameId: 999,
      isConnected: true,
      connectionProgress: 0
    },
  })

  var getMainBetting = function () {
    var mainBetting = shallowMount(MainBetting, {
      mocks: {
        $store: store,
      },
    })
    return mainBetting
  }

  var expectTheInvitationToShow = function(wrapper, yesOrNo) {
    expect(wrapper.vm.invitationToNextGameIsDisplayed).toBe(yesOrNo)
    expect(wrapper.find(".invitationToNextGame").exists()).toBe(yesOrNo)
    expect(wrapper.find(".joinNextGame").exists()).toBe(yesOrNo)
  }

  // reset spies, initial state and getters
  beforeEach(() => {
    store.reset()
  })

  it("renders with empty data in the store", async () => {
    const store = new Store({
      state: {},
      getters: {
        allGames: {},
        latestGameId: 0,
        isConnected: false,
        connectionProgress: 0
      },
    })
    var wrapper = shallowMount(MainBetting, {
      mocks: {
        $store: store,
      },
    })
    
    expect(wrapper.vm.currentGame).toEqual({})
  })

  it("update happy path", async () => {
    const wrapper = getMainBetting()
    await Vue.nextTick()

    expect(wrapper.vm.isConnected).toBe(true)
    wrapper.vm.currentGame // ?
    expect(wrapper.vm.currentGame.GameId).toEqual(999)
    expect(wrapper.vm.currentGame.FixtureState).toEqual("fixtureStateSomeValue")
    expect(wrapper.vm.currentGame.Score).toEqual([1, 2, 3, 4])
    expect(wrapper.vm.currentGame.Markets).toEqual([])

    wrapper.vm.$store.commit("changeGame") //?
  })

  it("shows an invitation to the next game", async () => {
    const wrapper = getMainBetting()
    await Vue.nextTick()

    expect(wrapper.vm.currentGame.Markets).toBeArrayOfSize(0)
    var updateExample = {
      Markets: [{
        Outcomes: [{
          Uid: 'someUid',
          TrueProbability: 0.9
        }],
        Status: 'Open'
      }],
      GameId: 999
    };
    expectTheInvitationToShow(wrapper, false)

    expect(wrapper.vm.displayedGameId).toStrictEqual(999)
    store.getters.allGames[1000] = updateExample
    store.getters.latestGameId = 1000
    expect(wrapper.vm.currentGame.Markets).toBeArrayOfSize(0)

    await Vue.nextTick()
    expectTheInvitationToShow(wrapper, true)
  })

  it("can receive update from the previous game even though there is a new one", async () => {
    const wrapper = getMainBetting()
    await Vue.nextTick()

    expect(wrapper.vm.currentGame.Markets).toBeArrayOfSize(0)
    var updateExample = {
      Markets: [{
        Outcomes: [{
          Uid: 'someUid',
          TrueProbability: 0.9
        }],
        Status: 'Open'
      }],
      GameId: 999
    };

    store.getters.allGames[1000] = updateExample
    store.getters.latestGameId = 1000

    await Vue.nextTick()

    updateExample.GameId = 7
    store.getters.allGames[999] = updateExample
    expect(wrapper.vm.currentGame.GameId).toStrictEqual(7)
    expect(wrapper.vm.displayedGameId).toStrictEqual(999)

    await Vue.nextTick()
    expectTheInvitationToShow(wrapper, true)
  })

  it.skip("changes current displayed game when invitation is accepted", async () => {
    const wrapper = getMainBetting()
    await Vue.nextTick()

    expect(wrapper.vm.currentGame.Markets).toBeArrayOfSize(0)
    var updateExample = {
      Markets: [{
        Outcomes: [{
          Uid: 'someUid',
          TrueProbability: 0.9
        }],
        Status: 'Open'
      }],
      GameId: 1000
    };
    store.getters.allGames[1000] = updateExample
    store.getters.latestGameId = 1000
    await Vue.nextTick()
    wrapper.find(".joinNextGame").trigger('click')
    await Vue.nextTick()
    expectTheInvitationToShow(wrapper, false)
    expect(wrapper.vm.displayedGameId).toStrictEqual(1000)
    expect(wrapper.vm.currentGame.GameId).toStrictEqual(1000)
  })
})