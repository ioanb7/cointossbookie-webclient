package Game

import (
	"cointossbookie/ScoutInfo"
	"fmt"
)

type ScoreBoard struct {
}

func (sb ScoreBoard) String(scoutInfo ScoutInfo.ScoutInfo) string {
	var output = fmt.Sprintf("Game state: %s\nStates so far: ", scoutInfo.FixtureState.String())
	for _, element := range scoutInfo.GetAllFlipsAsHostTypes() {
		toAdd := "[ ]"
		if element == ScoutInfo.HostTypeHome {
			toAdd = "[H]"
		}
		if element == ScoutInfo.HostTypeAway {
			toAdd = "[A]"
		}
		output += (toAdd + " ")
	}
	return output + "\n"
}
