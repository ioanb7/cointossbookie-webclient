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

func NewSelections(home float32, away float32, selectionType SelectionType) []Selection {
	var selections = []Selection{
		Selection{home, ScoutInfo.HostTypeHome, selectionType},
		Selection{away, ScoutInfo.HostTypeAway, selectionType},
	}
	return selections
}

func (s Selection) GetPrice() float32 {
	return s.TrueProbability * 1.05
}

func (s Selection) String() string {
	selectionName := s.HostType.String()

	switch s.SelectionType {
	case SelectionTypeYesNo:
		selectionName = "Yes"
		if s.HostType == ScoutInfo.HostTypeAway {
			selectionName = "No"
		}
	case SelectionTypeOverUnder:
		selectionName = "Over"
		if s.HostType == ScoutInfo.HostTypeAway {
			selectionName = "Under"
		}
	}
	return fmt.Sprintf("%s: %.2f (TP: %.2f)", selectionName, s.GetPrice(), s.TrueProbability)
}
