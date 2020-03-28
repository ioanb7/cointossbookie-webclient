package Calculator

import (
	"cointossbookie/ScoutInfo"
	"errors"
	"fmt"
)

type Calculator struct {
	Scoutinfo *ScoutInfo.ScoutInfo
}

func New(s *ScoutInfo.ScoutInfo) Calculator {
	c := Calculator{s}
	return c
}

func (c Calculator) GetMarkets() ([]Market, error) {
	homeRawOdds := c.Scoutinfo.HomeShare
	awayRawOdds := 1 - c.Scoutinfo.HomeShare

	var selections = []Selection{
		Selection{homeRawOdds, homeRawOdds * 1.3, ScoutInfo.HostTypeHome},
		Selection{awayRawOdds, awayRawOdds * 1.3, ScoutInfo.HostTypeAway},
	}

	var markets = []Market{
		NewMarket(NthFlipMarketType, 1, selections, OpenMarketStatus),
	}

	return markets, nil
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

	return 0.0, errors.New(fmt.Sprintf("Couldn't calculate bet %f on host type %d", bet, hostType))
}

func (c Calculator) String() (string, error) {
	output := fmt.Sprintf("Markets are:\n")
	if markets, e := c.GetMarkets(); e == nil {
		for _, market := range markets {
			output += fmt.Sprintf("Market: %s (%f) with selections:\n", market.MarketType.String(), market.Handicap)
			for _, selection := range market.Selections {
				output += fmt.Sprintf("%s: %f (TP: %f)\n", selection.hostType.String(), selection.price, selection.trueProbability)
			}
		}
		return output, nil
	} else {
		return "", e
	}
}
