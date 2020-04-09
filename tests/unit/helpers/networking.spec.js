import Convertor from '@/helpers/convertor';
jest.mock('@/helpers/convertor');

import Server from "jest-websocket-mock";
import Networking from '@/helpers/Networking'

describe('Networking.js', () => {
  var getNetworkingAndServer = function (onMessage) {
    const server = new Server(process.env.WEBSOCKET_URL);
    const networking = new Networking(onMessage);

    expect(Convertor).toHaveBeenCalledTimes(1);
    return {
      server,
      networking
    };
  }

  var spyConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  var spyConsoleError = jest.spyOn(console, 'error').mockImplementation();

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Convertor.mockClear();
  });

  afterEach(() => {
    Server.clean();

    spyConsoleLog.mockClear();
    spyConsoleError.mockClear();
  });

  it('We can check if the consumer called the class constructor', () => {
    expect(Convertor).not.toHaveBeenCalled();
    // eslint-disable-next-line no-unused-vars
    const networking = new Networking();
    expect(Convertor).toHaveBeenCalledTimes(1);
  });

  it('calls the convertor when it retrieves a message', async () => {
    const payload = {
      'someProperty': 'someValue'
    };
    const payloadSerialised = JSON.stringify(payload)

    // set up
    const dispatch = jest.fn();
    let {server, networking} = getNetworkingAndServer(dispatch)

    // execute
    networking.run()
    await server.connected;
    server.send(payloadSerialised);

    // assert convertor is called
    const mockConvertorAll = Convertor.mock.instances[0].All
    expect(mockConvertorAll).toHaveBeenCalledTimes(1);
    //expect(mockConvertorAll.mock.calls[0][0]).toEqual(payload) == below
    expect(mockConvertorAll).toHaveBeenNthCalledWith(1, payload)
  })

  it('calls the logger when it retrieves a message', async () => {
    // set up
    const dispatch = jest.fn();
    let {
      server,
      networking
    } = getNetworkingAndServer(dispatch)
    
    networking.run()
    await server.connected;

    // assert
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    server.send("{}");
    expect(spyConsoleLog).toHaveBeenCalledTimes(2);
  })

  it('calls the logger error when it fails to connect', async () => {
    // set up
    const dispatch = jest.fn();
    let {
      server,
      networking
    } = getNetworkingAndServer(dispatch)

    // execute
    networking.run()
    await server.connected
    await server.error(); // don't gracefully close the connection

    expect(spyConsoleError).toHaveBeenCalledTimes(1);
  })
})
