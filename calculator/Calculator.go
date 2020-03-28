package Calculator

import (
	"cointossbookie/ScoutInfo"
	"fmt"
	"math"
)

type Calculator struct {
	Scoutinfo *ScoutInfo.ScoutInfo
}

func New(s *ScoutInfo.ScoutInfo) Calculator {
	c := Calculator{s}
	return c
}

func (c Calculator) GetMarkets() ([]Market, error) {
	var markets = []Market{}
	markets = append(markets, c.getNthFlipMarkets()...)
	markets = append(markets, c.getNthFlipExactMarkets()...)
	return markets, nil
}

func (c Calculator) getNthFlipMarkets() []Market {
	var markets = []Market{}

	for i := 1; i < 6; i++ {
		homeRawOdds := c.Scoutinfo.HomeShare
		awayRawOdds := 1 - c.Scoutinfo.HomeShare

		var status = OpenMarketStatus
		if c.Scoutinfo.FlipsSoFar() >= i {
			if c.Scoutinfo.GetNthFlipHostType(i) == ScoutInfo.HostTypeHome {
				homeRawOdds = 1.0
				awayRawOdds = 0.0
			} else {
				homeRawOdds = 0.0
				awayRawOdds = 1.0
			}
			status = SettledMarketStatus
		}

		var selections = []Selection{
			Selection{homeRawOdds, homeRawOdds * 1.3, ScoutInfo.HostTypeHome},
			Selection{awayRawOdds, awayRawOdds * 1.3, ScoutInfo.HostTypeAway},
		}

		var market = NewMarket(NthFlipMarketType, float32(i), selections, status)
		markets = append(markets, market)
	}

	return markets
}

func (c Calculator) getNthFlipExactMarkets() []Market {
	var markets = []Market{}

	var startAt = c.Scoutinfo.FlipsSoFar() + 1
	var endAt = 5

	for i := 1; i <= endAt; i++ {
		//flipProbability := c.getFlipProbability(endAt - i)
		var diff = float64(i - startAt)
		var pow = float32(math.Pow(2, diff))
		homeRawOdds := (c.Scoutinfo.HomeShare) * pow
		awayRawOdds := (1 - c.Scoutinfo.HomeShare) * pow
		var status = OpenMarketStatus

		if i < startAt { // settled
			if c.Scoutinfo.GetNthFlipHostType(i) == ScoutInfo.HostTypeHome {
				homeRawOdds = 1.0
				awayRawOdds = 0.0
			} else {
				homeRawOdds = 0.0
				awayRawOdds = 1.0
			}

			status = SettledMarketStatus
		}

		var selections = []Selection{
			Selection{homeRawOdds, homeRawOdds * 1.3, ScoutInfo.HostTypeHome},
			Selection{awayRawOdds, awayRawOdds * 1.3, ScoutInfo.HostTypeAway},
		}

		var market = NewMarket(NthFlipExactMarketType, float32(i), selections, status)
		markets = append(markets, market)
	}

	return markets
}

func (c Calculator) getFlipProbability(nthFlip int) float32 {
	var totalPossibilities = 2 * nthFlip
	return 1.0 / float32(totalPossibilities)
}

func (c Calculator) GetPriceForBet(marketType MarketType, hostType ScoutInfo.HostType, bet float32) (float32, error) {
	if markets, e := c.GetMarkets(); e == nil {
		for _, market := range markets {
			for _, selection := range market.Selections {
				if selection.hostType == hostType {
					return bet + bet*(1/selection.price), nil
				}
			}
		}
	}

	return 0.0, fmt.Errorf("Couldn't calculate bet %f on host type %d", bet, hostType)
}

func (c Calculator) String() (string, error) {
	output := fmt.Sprintf("Markets are:\n")
	if markets, e := c.GetMarkets(); e == nil {
		for _, market := range markets {
			output += fmt.Sprintf("Market: %s with selections:\n", market.String())
			for _, selection := range market.Selections {
				output += fmt.Sprintf("%s: %f (TP: %f)\n", selection.hostType.String(), selection.price, selection.trueProbability)
			}
		}
		return output, nil
	} else {
		return "", e
	}
}
