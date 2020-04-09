package Game

import (
	"cointossbookie/ScoutInfo"
	"fmt"
)

type ScoreBoard struct {
}

func (sb ScoreBoard) String(scoutInfo ScoutInfo.ScoutInfo) string {
	var output = fmt.Sprintf("Game state: %s\nStates so far: ", scoutInfo.FixtureState.String())
	var hostTypeArrayStringify = ScoutInfo.HostTypeArrayStringify{}
	output += hostTypeArrayStringify.String(scoutInfo.GetAllFlipsAsHostTypes())
	return output + "\n"
}
