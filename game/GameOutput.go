package Game

import (
	"cointossbookie/Calculator"
	"cointossbookie/ScoutInfo"
)

type GameOutput struct {
	Id           int
	Markets      []Calculator.Market
	FixtureState ScoutInfo.FixtureState
	Score        []ScoutInfo.HostType
}

func NewGameOutput(game_id int, markets []Calculator.Market, fixtureState ScoutInfo.FixtureState, score []ScoutInfo.HostType) GameOutput {
	gameOutput := GameOutput{game_id, markets, fixtureState, score}
	return gameOutput
}
