package Calculator

import (
	"cointossbookie/ScoutInfo"
	"fmt"
)

type Market struct {
	MarketType MarketType
	Handicap   float32
	Outcomes []Outcome
	Status     MarketStatus
	HostTypes  []ScoutInfo.HostType
}

func NewMarket(marketType MarketType, handicap float32, outcomes []Outcome, status MarketStatus) Market {
	m := Market{marketType, handicap, outcomes, status, []ScoutInfo.HostType{}}
	return m
}

func (m Market) String() string {
	var output string = ""

	handicap := fmt.Sprintf("%.1f", m.Handicap)
	if float32(int(m.Handicap)) == m.Handicap {
		handicap = fmt.Sprintf("%.0f", m.Handicap)
	}

	output = fmt.Sprintf("%s (%s) [%s]", m.MarketType.String(), handicap, m.Status.String())
	if m.Handicap < 0.5 {
		output = fmt.Sprintf("%s [%s]", m.MarketType.String(), m.Status.String())
	}

	if len(m.HostTypes) > 0 {
		var hostTypeArrayStringify = ScoutInfo.HostTypeArrayStringify{}
		output += " " + hostTypeArrayStringify.String(m.HostTypes)
	}

	return output
}
