package Calculator

import (
	"cointossbookie/ScoutInfo"
	"fmt"
)

type Market struct {
	MarketType MarketType
	Handicap   float32
	Selections []Selection
	Status     MarketStatus
	HostTypes  []ScoutInfo.HostType
}

func NewMarket(marketType MarketType, handicap float32, selections []Selection, status MarketStatus) Market {
	m := Market{marketType, handicap, selections, status, []ScoutInfo.HostType{}}
	return m
}

func (m Market) String() string {
	var output string = fmt.Sprintf("%s (%f) [%s]", m.MarketType.String(), m.Handicap, m.Status.String())
	if len(m.HostTypes) > 0 {
		var hostTypeArrayStringify = ScoutInfo.HostTypeArrayStringify{}
		output += " " + hostTypeArrayStringify.String(m.HostTypes)
	}
	return output
}
