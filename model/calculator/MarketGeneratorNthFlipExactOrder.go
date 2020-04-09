package Calculator

import (
	"cointossbookie/ScoutInfo"
	"math"
)

type MarketGeneratorNthFlipExactOrder struct {
}

func (mg MarketGeneratorNthFlipExactOrder) GetMarkets(scoutInfo ScoutInfo.ScoutInfo) []Market {

	var markets = []Market{}

	for _, hostTypesHere := range mg.getAllHostTypePermutationsOfN() {

		var powPow = 5 - scoutInfo.FlipsSoFar() - 1
		var pow = float32(math.Pow(2, float64(powPow)))
		homeRawOdds := (scoutInfo.HomeShare) * pow
		awayRawOdds := (1 - scoutInfo.HomeShare) * pow
		outcomes := NewOutcomes(homeRawOdds, awayRawOdds, OutcomeTypeYesNo)
		var market = NewMarket(NthFlipExactOrderMarketType, 0, outcomes, OpenMarketStatus)
		market.HostTypes = hostTypesHere

		if scoutInfo.FlipsSoFar() == 5-1 {
			//suspend.. there are other markets similar to this anyway.
			market.Status = SuspendedMarketStatus
		}

		for i, element := range scoutInfo.GetAllFlipsAsHostTypes() {
			if element == ScoutInfo.HostTypeNone {
				break
			}

			if market.HostTypes[i] != element {
				market.Status = SettledMarketStatus
				market.Outcomes = NewOutcomes(0, 1, OutcomeTypeYesNo)
				break
			}

			//settled success.
			if i == 4 {
				market.Status = SettledMarketStatus
				market.Outcomes = NewOutcomes(1, 0, OutcomeTypeYesNo)
			}
		}

		markets = append(markets, market)
	}

	return markets
}

func (mg MarketGeneratorNthFlipExactOrder) getAllHostTypePermutationsOfN() [][]ScoutInfo.HostType { // 5
	var result [][]ScoutInfo.HostType
	var g = Generator{}
	for _, element := range g.Generate(5) {
		var workingArrayCopy = make([]ScoutInfo.HostType, len(element))
		for i, el := range element {
			if el == 0 {
				workingArrayCopy[i] = ScoutInfo.HostTypeHome
			} else {
				workingArrayCopy[i] = ScoutInfo.HostTypeAway
			}
		}
		result = append(result, workingArrayCopy)
	}

	return result
}
