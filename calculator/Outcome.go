package Calculator

import (
	"cointossbookie/ScoutInfo"
	"fmt"
)

type Outcome struct {
	TrueProbability float32
	HostType        ScoutInfo.HostType
	OutcomeType     OutcomeType
}

func NewOutcomes(home float32, away float32, outcomeType OutcomeType) []Outcome {
	var outcomes = []Outcome{
		Outcome{home, ScoutInfo.HostTypeHome, outcomeType},
		Outcome{away, ScoutInfo.HostTypeAway, outcomeType},
	}
	return outcomes
}

func (s Outcome) GetPrice() float32 {
	return s.TrueProbability * 1.05
}

func (s Outcome) String() string {
	outcomeName := s.HostType.String()

	switch s.OutcomeType {
	case OutcomeTypeYesNo:
		outcomeName = "Yes"
		if s.HostType == ScoutInfo.HostTypeAway {
			outcomeName = "No"
		}
	case OutcomeTypeOverUnder:
		outcomeName = "Over"
		if s.HostType == ScoutInfo.HostTypeAway {
			outcomeName = "Under"
		}
	}
	return fmt.Sprintf("%s: %.2f (TP: %.2f)", outcomeName, s.GetPrice(), s.TrueProbability)
}
