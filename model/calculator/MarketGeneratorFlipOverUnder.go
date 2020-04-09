package Calculator

import (
	"cointossbookie/ScoutInfo"
	"math"
)

type MarketGeneratorFlipOverUnder struct {
}

func (mg MarketGeneratorFlipOverUnder) GetMarkets(scoutInfo ScoutInfo.ScoutInfo) []Market {
	var markets = []Market{}

	homeFlips := scoutInfo.CountFlipsForHostType(ScoutInfo.HostTypeHome)
	awayFlips := scoutInfo.CountFlipsForHostType(ScoutInfo.HostTypeAway)
	totalFlips := homeFlips + awayFlips

	for i := 0; i < 5; i++ {
		var powPow = 5 - scoutInfo.FlipsSoFar() - 1
		var pow = float32(math.Pow(2, float64(powPow)))
		homeRawOdds := (scoutInfo.HomeShare) * pow
		awayRawOdds := (1 - scoutInfo.HomeShare) * pow
		outcomes := NewOutcomes(homeRawOdds, awayRawOdds, OutcomeTypeOverUnder)
		var market = NewMarket(HomeWinOverUnderMarketType, float32(i)+0.5, outcomes, OpenMarketStatus)

		if scoutInfo.FlipsSoFar() == 5-1 {
			//suspend.. there are other markets similar to this anyway.
			market.Status = SuspendedMarketStatus
		}

		if totalFlips > i {
			market.Status = SuspendedMarketStatus
		}

		if scoutInfo.FlipsSoFar() == 5 {
			if homeFlips > i {
				homeRawOdds = 1
				awayRawOdds = 0
			} else {
				homeRawOdds = 0
				awayRawOdds = 1
			}

			market.Status = SettledMarketStatus
			market.Outcomes = NewOutcomes(homeRawOdds, awayRawOdds, OutcomeTypeOverUnder)
		}

		markets = append(markets, market)
	}

	return markets
}
