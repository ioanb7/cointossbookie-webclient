package Calculator

import (
	"cointossbookie/ScoutInfo"
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
	var markets = []Market{}

	mgNthFlip := MarketGeneratorNthFlip{}
	mgNthFlipExactPosition := MarketGeneratorNthFlipExactPosition{}
	mgNthFlipExactOrder := MarketGeneratorNthFlipExactOrder{}

	markets = append(markets, mgNthFlip.GetMarkets(*c.Scoutinfo)...)
	markets = append(markets, mgNthFlipExactPosition.GetMarkets(*c.Scoutinfo)...)
	markets = append(markets, mgNthFlipExactOrder.GetMarkets(*c.Scoutinfo)...)

	return markets, nil
}

func (c Calculator) GetPriceForBet(marketType MarketType, hostType ScoutInfo.HostType, bet float32) (float32, error) {
	if markets, e := c.GetMarkets(); e == nil {
		for _, market := range markets {
			for _, selection := range market.Selections {
				if selection.HostType == hostType {
					return bet + bet*(1/selection.Price), nil
				}
			}
		}
	}

	return 0.0, fmt.Errorf("Couldn't calculate bet %f on host type %d", bet, hostType)
}
