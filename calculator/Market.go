package Calculator

import (
	"fmt"
)

type Market struct {
	MarketType MarketType
	Handicap   float32
	Selections []Selection
	Status     MarketStatus
}

func NewMarket(marketType MarketType, handicap float32, selections []Selection, status MarketStatus) Market {
	m := Market{marketType, handicap, selections, status}
	return m
}

func (m Market) String() string {
	return fmt.Sprintf("%s (%f) [%s]", m.MarketType.String(), m.Handicap, m.Status.String())
}
