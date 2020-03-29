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
	markets = append(markets, c.getNthFlipExactOrderMarkets()...)

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
			Selection{homeRawOdds, homeRawOdds * 1.3, ScoutInfo.HostTypeHome, SelectionTypeHomeAway},
			Selection{awayRawOdds, awayRawOdds * 1.3, ScoutInfo.HostTypeAway, SelectionTypeHomeAway},
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

		if c.Scoutinfo.FlipsSoFar() == 5-1 {
			//suspend.. there are other markets similar to this anyway.
			status = SuspendedMarketStatus
		}

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
			Selection{homeRawOdds, homeRawOdds * 1.3, ScoutInfo.HostTypeHome, SelectionTypeHomeAway},
			Selection{awayRawOdds, awayRawOdds * 1.3, ScoutInfo.HostTypeAway, SelectionTypeHomeAway},
		}

		var market = NewMarket(NthFlipExactMarketType, float32(i), selections, status)
		markets = append(markets, market)
	}

	return markets
}

func (c Calculator) getNthFlipExactOrderMarkets() []Market {
	var markets = []Market{}

	for _, hostTypesHere := range c.getAllHostTypePermutationsOfN() {

		var powPow = 5 - c.Scoutinfo.FlipsSoFar() - 1
		var pow = float32(math.Pow(2, float64(powPow)))
		homeRawOdds := (c.Scoutinfo.HomeShare) * pow
		awayRawOdds := (1 - c.Scoutinfo.HomeShare) * pow
		var selections = []Selection{
			Selection{homeRawOdds, homeRawOdds * 1.3, ScoutInfo.HostTypeHome, SelectionTypeYesNo},
			Selection{awayRawOdds, awayRawOdds * 1.3, ScoutInfo.HostTypeAway, SelectionTypeYesNo},
		}
		var market = NewMarket(NthFlipExactMarketType, 0, selections, OpenMarketStatus)
		market.HostTypes = hostTypesHere

		if c.Scoutinfo.FlipsSoFar() == 5-1 {
			//suspend.. there are other markets similar to this anyway.
			market.Status = SuspendedMarketStatus
		}

		for i, element := range c.Scoutinfo.GetAllFlipsAsHostTypes() {
			if element == ScoutInfo.HostTypeNone {
				break
			}

			if market.HostTypes[i] != element {
				homeRawOdds = 0.0
				awayRawOdds = 1.0
				var selections = []Selection{
					Selection{homeRawOdds, homeRawOdds * 1.3, ScoutInfo.HostTypeHome, SelectionTypeYesNo},
					Selection{awayRawOdds, awayRawOdds * 1.3, ScoutInfo.HostTypeAway, SelectionTypeYesNo},
				}

				market.Status = SettledMarketStatus
				market.Selections = selections
				break
			}

			//settled success.
			if i == 4 {
				homeRawOdds = 1.0
				awayRawOdds = 0.0
				var selections = []Selection{
					Selection{homeRawOdds, homeRawOdds * 1.3, ScoutInfo.HostTypeHome, SelectionTypeYesNo},
					Selection{awayRawOdds, awayRawOdds * 1.3, ScoutInfo.HostTypeAway, SelectionTypeYesNo},
				}

				market.Status = SettledMarketStatus
				market.Selections = selections
			}
		}

		markets = append(markets, market)
	}

	return markets
}

func (c Calculator) getAllHostTypePermutationsOfN() [][]ScoutInfo.HostType { // 5
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
