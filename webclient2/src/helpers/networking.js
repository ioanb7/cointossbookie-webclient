import ReconnectingWebSocket from 'reconnecting-websocket';
import Convertor from '../helpers/convertor';

export default class Networking {
  constructor(onMessage) {
    this.onMessage = onMessage;
    this.convertor = new Convertor();
  }
  
  run = () => {
    var self = this;

    const rws = new ReconnectingWebSocket('ws://localhost:7777/status');
    rws.binaryType = "arraybuffer";

    rws.addEventListener('open', () => {
      rws.send('hello!');
      console.log("WebSocket: open")
    });

    rws.addEventListener('error', () => {
      console.log("WebSocket: error")
    });

    rws.addEventListener('close', () => {
      console.log("WebSocket: close")
    });

    rws.addEventListener('message', (message) => {
      console.log("WebSocket: message")
      self.onMessage(self.convertor.All(JSON.parse(message.data)))
    });

  }
}
