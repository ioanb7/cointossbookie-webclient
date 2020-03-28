package Calculator

import (
	"cointossbookie/ScoutInfo"
	"errors"
	"fmt"
)

type Calculator struct {
	scoutinfo *ScoutInfo.ScoutInfo
}

func New(s *ScoutInfo.ScoutInfo) Calculator {
	c := Calculator{s}
	return c
}

func (c Calculator) calculatePrices() ([]Selection, error) {
	if len(c.scoutinfo.Messages) != 0 {
		return nil, errors.New("can't calculate if anything happened in the game yet - not implemented")
	} else {
		homeRawOdds := c.scoutinfo.HomeShare
		awayRawOdds := 1 - c.scoutinfo.HomeShare

		var selections = []Selection{
			Selection{homeRawOdds, homeRawOdds * 1.3, HostTypeHome},
			Selection{awayRawOdds, awayRawOdds * 1.3, HostTypeAway},
		}

		return selections, nil
	}
}

func (c Calculator) GetPriceForBet(hostType HostType, bet float32) (float32, error) {
	if selections, e := c.calculatePrices(); e == nil {
		for _, selection := range selections {
			if selection.hostType == hostType {
				return bet + bet*(1/selection.price), nil
			}
		}
	}

	return 0.0, errors.New(fmt.Sprintf("Couldn't calculate bet %f on host type %d", bet, hostType))
}

func (c Calculator) String() (string, error) {
	if selections, e := c.calculatePrices(); e == nil {
		output := fmt.Sprintf("Odds are:\n")
		for _, selection := range selections {
			output += fmt.Sprintf("%s: %f (TP: %f)\n", selection.hostType.String(), selection.price, selection.trueProbability)
		}
		return output, nil
	} else {
		return "", e
	}
}
