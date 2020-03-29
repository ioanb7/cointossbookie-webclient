package Calculator

import (
	"cointossbookie/ScoutInfo"
	"fmt"
)

type Selection struct {
	TrueProbability float32
	price           float32
	hostType        ScoutInfo.HostType
	SelectionType   SelectionType
}

func (s Selection) String() string {
	selectionName := s.hostType.String()
	if s.SelectionType == SelectionTypeYesNo {
		selectionName = "Yes"
		if s.hostType == ScoutInfo.HostTypeAway {
			selectionName = "No"
		}
	}
	return fmt.Sprintf("%s: %.2f (TP: %.2f)", selectionName, s.price, s.TrueProbability)
}
