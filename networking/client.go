package networking

// Original code from https://github.com/zianwar/go-websocket-broadcast

import (
	"log"

	"github.com/gorilla/websocket"
)

var NextID int

type client struct {
	id   int
	conn *websocket.Conn
	ch   chan []byte
	quit chan struct{}
}

func NewClient(conn *websocket.Conn) *client {
	NextID++
	conn.EnableWriteCompression(true)
	return &client{
		id:   NextID,
		conn: conn,
		quit: make(chan struct{}),
		ch:   make(chan []byte),
	}
}

func (c *client) Close() {
	close(c.quit)
}

func (c *client) handle() {
	for {
		select {
		case <-c.quit:
			if err := c.conn.Close(); err != nil {
				log.Printf("client %d connection close error %v\n", c.id, err)
			}
			return
		case n := <-c.ch:
			if err := c.conn.WriteMessage(websocket.TextMessage, n); err != nil {
				//if err := c.conn.WriteMessage(websocket.BinaryMessage, n); err != nil {
				//if err := c.conn.WriteJSON(n); err != nil {
				log.Println("ws write error:", err)
				return
			}
		}
	}
}
