package Calculator

import (
	"cointossbookie/ScoutInfo"
	"fmt"
)

type Selection struct {
	TrueProbability float32
	HostType        ScoutInfo.HostType
	SelectionType   SelectionType
}

func (s Selection) GetPrice() float32 {
	return s.TrueProbability * 1.3
}

func (s Selection) String() string {
	selectionName := s.HostType.String()
	if s.SelectionType == SelectionTypeYesNo {
		selectionName = "Yes"
		if s.HostType == ScoutInfo.HostTypeAway {
			selectionName = "No"
		}
	}
	return fmt.Sprintf("%s: %.2f (TP: %.2f)", selectionName, s.GetPrice(), s.TrueProbability)
}
