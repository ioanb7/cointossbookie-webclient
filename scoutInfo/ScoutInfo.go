package ScoutInfo

import (
	"fmt"
)

type message struct {
	eventType EventType
	matchTime float32
}

type ScoutInfo struct {
	Messages  []message
	HomeShare float32
}

func New(homeShare float32) ScoutInfo {
	messages := []message{}
	s := ScoutInfo{messages, homeShare}
	return s
}

func (s ScoutInfo) String() string {
	output := ""
	if len(s.Messages) == 0 {
		output = "ScoutInfo (0 messages)\n\n"
	} else {
		output = fmt.Sprintf("\nScoutInfo (%d messages):\n", len(s.Messages))
		for _, element := range s.Messages {
			output2 := fmt.Sprintf("- %s\n", element.eventType.String())
			output = output + output2
		}
		output = output + "\n"
	}
	return output
}

func (s *ScoutInfo) Add(eventType EventType) {
	message := message{eventType, 0.0}
	s.Messages = append(s.Messages, message)
}
