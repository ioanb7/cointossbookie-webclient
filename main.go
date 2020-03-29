package main

import (
	"cointossbookie/Game"
	"fmt"
	"time"
)

func main() {
	var game_id int = 1
	var ch = make(chan []byte)
	go broadcastGameOutput(ch)
	for {
		fmt.Printf("Game %d starting\n", game_id)

		var g = Game.New(game_id, &ch)
		g.Play()

		fmt.Printf("Pause before the next game starts..\n")
		time.Sleep(10000 * time.Millisecond)
		game_id++
	}
}

func broadcastGameOutput(ch chan []byte) {
	for {
		select {
		case message := <-ch:
			fmt.Printf("Received from game for broadcast (len %d): \n\n\n\n\n\n%s\n", len(message), string(message))
		}
	}
}
