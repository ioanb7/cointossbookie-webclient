package ScoutInfo

import (
	"fmt"
)

type ScoutInfo struct {
	Messages     []Message
	HomeShare    float32
	FixtureState FixtureState
}

func New(homeShare float32) ScoutInfo {
	Messages := []Message{}
	s := ScoutInfo{Messages, homeShare, PreMatchFixtureState}
	return s
}

func (s ScoutInfo) String() string {
	output := ""
	if len(s.Messages) == 0 {
		output = "ScoutInfo (0 messages)\n\n"
	} else {
		output = fmt.Sprintf("\nScoutInfo (%d messages):\n", len(s.Messages))
		for _, message := range s.Messages {
			output2 := fmt.Sprintf("- %s\n", message.String())
			output = output + output2
		}
		output = output + "\n"
	}
	return output
}

func (s *ScoutInfo) Add(eventType EventType, hostType HostType) {
	message := Message{eventType, hostType, 0.0}
	s.Messages = append(s.Messages, message)

	switch eventType {
	case GameStarted:
		s.FixtureState = InPlayFixtureState
	case GameEnded:
		s.FixtureState = FinishedFixtureState
	}
}

func (s ScoutInfo) FlipsSoFar() int {
	var result int
	for _, message := range s.Messages {
		if message.EventType == CoinToss {
			result++
		}
	}
	return result
}

func (s ScoutInfo) GetNthFlipHostType(nth int) HostType {
	var seenSoFar int
	for _, message := range s.Messages {
		if message.EventType == CoinToss {
			seenSoFar++
			if seenSoFar == nth {
				return message.HostType
			}
		}
	}
	return HostTypeNone
}

func (s ScoutInfo) GetAllFlipsAsHostTypes() []HostType {
	var result []HostType
	for _, message := range s.Messages {
		if message.EventType == CoinToss {
			if message.HostType != HostTypeNone { // should throw an exception here
				result = append(result, message.HostType)
			}
		}
	}
	for i := len(result); i < 5; i++ {
		result = append(result, HostTypeNone)
	}
	return result
}
