package Calculator

import (
	"cointossbookie/ScoutInfo"
)

type MarketGeneratorNthFlip struct {
}

func (mg MarketGeneratorNthFlip) GetMarkets(scoutInfo ScoutInfo.ScoutInfo) []Market {
	var markets = []Market{}

	for i := 1; i < 6; i++ {
		homeRawOdds := scoutInfo.HomeShare
		awayRawOdds := 1 - scoutInfo.HomeShare

		var status = OpenMarketStatus
		if scoutInfo.FlipsSoFar() >= i {
			if scoutInfo.GetNthFlipHostType(i) == ScoutInfo.HostTypeHome {
				homeRawOdds = 1.0
				awayRawOdds = 0.0
			} else {
				homeRawOdds = 0.0
				awayRawOdds = 1.0
			}
			status = SettledMarketStatus
		}

		var selections = []Selection{
			Selection{homeRawOdds, homeRawOdds * 1.3, ScoutInfo.HostTypeHome, SelectionTypeHomeAway},
			Selection{awayRawOdds, awayRawOdds * 1.3, ScoutInfo.HostTypeAway, SelectionTypeHomeAway},
		}

		var market = NewMarket(NthFlipMarketType, float32(i), selections, status)
		markets = append(markets, market)
	}

	return markets
}
