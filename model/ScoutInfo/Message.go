package ScoutInfo

import (
	"fmt"
)

type Message struct {
	EventType EventType
	HostType  HostType
	MatchTime float32
}

func (m Message) String() string {
	return fmt.Sprintf("%s (%s)", m.EventType.String(), m.HostType.String())
}
