package http_handlers

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

func GameMessageHandler() http.Handler{
	var upgrader = websocket.Upgrader{} // use default options
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		c, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Printf("error accepting websocket connection from:", r.RemoteAddr)
			return
		}
		defer c.Close()

		for {
			mt, message, err := c.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				break
			}
			type := message[:1]


			log.Printf("recv: %s", message)
			err = c.WriteMessage(mt, message)
			if err != nil {
				log.Println("write:", err)
				break
			}
		}
	})
}
