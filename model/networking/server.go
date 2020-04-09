package networking

// Original code from https://github.com/zianwar/go-websocket-broadcast

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"io/ioutil"
	"log"
	"net/http"
)

func getWsUpgrader() *websocket.Upgrader {
	return &websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(r *http.Request) bool { return true },
	}
}

func SetUpNetworking(ch chan []byte) {
	gin.DefaultWriter = ioutil.Discard
	r := gin.Default()

	ch_output := make(chan []byte)
	globalQuit := make(chan struct{})
	hub := NewHub(ch_output, globalQuit)

	defer close(globalQuit)

	go hub.start()
	go broadcastGameOutput(ch, ch_output)

	r.GET("/status", wsHandler(getWsUpgrader(), globalQuit, hub))
	r.Run("localhost:7777")
}

func wsHandler(wsupgrader *websocket.Upgrader, globalQuit chan struct{}, hub *hub) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := wsupgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			//log.Fatalf("failed to upgrade websocket: %v\n", err)
			log.Printf("failed to upgrade websocket: %v\n", err)
			return
		}

		client := NewClient(conn)
		go client.handle()

		hub.Register(client)
	}
}

func broadcastGameOutput(ch_input chan []byte, ch_output chan []byte) {
	for {
		select {
		case message := <-ch_input:
			ch_output <- message
		}
	}
}
