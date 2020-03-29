package Calculator

import (
	"cointossbookie/ScoutInfo"
	"math"
)

type MarketGeneratorNthFlipExactPosition struct {
}

func (mg MarketGeneratorNthFlipExactPosition) GetMarkets(scoutInfo ScoutInfo.ScoutInfo) []Market {
	var markets = []Market{}

	var startAt = scoutInfo.FlipsSoFar() + 1
	var endAt = 5

	for i := 1; i <= endAt; i++ {
		//flipProbability := c.getFlipProbability(endAt - i)
		var diff = float64(i - startAt)
		var pow = float32(math.Pow(2, diff))
		homeRawOdds := (scoutInfo.HomeShare) * pow
		awayRawOdds := (1 - scoutInfo.HomeShare) * pow
		var status = OpenMarketStatus

		if scoutInfo.FlipsSoFar() == 5-1 {
			//suspend.. there are other markets similar to this anyway.
			status = SuspendedMarketStatus
		}

		if i < startAt { // settled
			if scoutInfo.GetNthFlipHostType(i) == ScoutInfo.HostTypeHome {
				homeRawOdds = 1.0
				awayRawOdds = 0.0
			} else {
				homeRawOdds = 0.0
				awayRawOdds = 1.0
			}

			status = SettledMarketStatus
		}

		outcomes := NewOutcomes(homeRawOdds, awayRawOdds, OutcomeTypeHomeAway)
		var market = NewMarket(NthFlipExactMarketType, float32(i), outcomes, status)
		markets = append(markets, market)
	}

	return markets
}
