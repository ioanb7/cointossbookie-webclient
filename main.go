package main

import (
	"cointossbookie/Game"
	"cointossbookie/networking"
	"fmt"
	"time"
	"os"
)

// TODO: https://stackoverflow.com/questions/35038864/how-to-access-global-variables
// TODO: websocket server breaks if client is not responsive on send.. (or some other issue)
func main() {
	var gameId int = 1
	var ch = make(chan []byte)
	go networking.SetUpNetworking(ch)

	var isDebug = len(os.Args) > 1 && os.Args[1] == "dev"

	if isDebug {
		fmt.Println("DEBUG: ON")
	}
	//go broadcastGameOutput(ch)
	for {
		fmt.Printf("Game %d starting\n", gameId)

		var g = Game.New(isDebug, gameId, &ch)
		g.Play(10000)

		fmt.Printf("Pause before the next game starts..\n")
		time.Sleep(2000 * time.Millisecond)
		gameId++
	}
}

/*
func broadcastGameOutput(ch chan []byte) {
	for {
		select {
		case message := <-ch:
			fmt.Printf("Received from game for broadcast (len %d): \n\n\n\n\n\n%s\n", len(message), string(message))
		}
	}
}*/
