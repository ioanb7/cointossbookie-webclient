import {
  shallowMount,
} from "@vue/test-utils";
import OutcomeName from "@/components/OutcomeName.vue";

describe("OutcomeName.vue", () => {

  var getOutcome = function (outcomeType, hostType) {
    var outcome = shallowMount(OutcomeName, {
      propsData: {
        outcome: {
          OutcomeType: outcomeType,
          HostType: hostType,
          Uid: 'someUid'
        },
        isOutcomeStatusOpen: true
      },
    })
    return outcome
  }

  it("creates happy path", async () => {
    const wrapper = getOutcome("Yes / No", "Home")
    expect(wrapper.vm.outcomeName).toBe("Yes")
  })

  it("creates happy path x", async () => {
    const wrapper = getOutcome("Yes / No", "Away")
    expect(wrapper.vm.outcomeName).toBe("No")
  })

  it("creates happy path x2", async () => {
    const wrapper = getOutcome("Over / Under", "Home")
    expect(wrapper.vm.outcomeName).toBe("Over")
  })

  it("creates happy path x2 x", async () => {
    const wrapper = getOutcome("Over / Under", "Away")
    expect(wrapper.vm.outcomeName).toBe("Under")
  })

  it("throws for invalid outcome combination", () => {
    expect(() => getOutcome("Yes / No", "None")).toThrow()
  })

  it("returns missing if outcome is null", async () => {
    var wrapper = shallowMount(OutcomeName, {
      propsData: {
        outcome: null,
        isOutcomeStatusOpen: true
      },
    })
    expect(wrapper.vm.outcomeName).toBe("MISSING_OUTCOME")
  })
})
