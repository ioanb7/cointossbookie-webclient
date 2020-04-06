import ReconnectingWebSocket from 'reconnecting-websocket';
import Convertor from '../helpers/convertor';

export default class Networking {
  constructor(onMessage) {
    this.onMessage = onMessage;
    this.convertor = new Convertor();
  }
  
  logMessage(message, isError) {
    message = `cointoss bookie's websocket: ${message}`
    if (!isError) {
      console.log(message)
      return
    }
    
    console.error(message)
  }

  run = () => {
    var self = this;

    const rws = new ReconnectingWebSocket('ws://localhost:7777/status');
    rws.binaryType = "arraybuffer";

    rws.addEventListener('open', () => {
      rws.send('hello!');
      self.logMessage('Open')
    });

    rws.addEventListener('error', () => {
      console.log("WebSocket: error")
      self.logMessage('Errored', true)
    });

    rws.addEventListener('close', () => {
      self.logMessage('Closed')
    });

    rws.addEventListener('message', (message) => {
      self.logMessage('Received message')
      self.onMessage(self.convertor.All(JSON.parse(message.data)))
    });

  }
}
