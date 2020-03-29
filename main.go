package main

import (
	"cointossbookie/Game"
	"fmt"
	"time"
)

func main() {
	var game_id int = 1
	for {
		fmt.Printf("Game %d starting\n", game_id)
		var g = Game.New(game_id)
		g.Play()

		fmt.Printf("Pause before the next game starts..\n")
		time.Sleep(10000 * time.Millisecond)
		game_id++
	}
}
