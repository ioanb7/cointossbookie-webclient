import Convertor from '@/helpers/Convertor'

// Note: the unit tests in this class will break easily
// it helps the developer/tester to break if the snapshot changes
// - consider it a way to confirm the changes to the code when they change
describe('Convertor.js', () => {
  var getConvertor = function () {
    return new Convertor()
  }

  var tryInputUntilItFails = function(func) {
    var output = "\r\n";
    for (var i = 0; i < 999; i++) {
      var returnedValue = func(i);
      output += `${i}: ${returnedValue}` + "\r\n"

      if (!returnedValue) break;
    }
    return output
  }

  var getFileContentsFromCurrentDirectory = function (filename) {
    var fs = require('fs');
    var path = require('path');
    return fs.readFileSync(path.resolve(__dirname, filename), 'UTF-8')
  }

  it('renders market type', () => {
    const convertor = getConvertor()
    expect(tryInputUntilItFails(convertor.marketType)).toMatchSnapshot();
  })

  it('renders outcome type', () => {
    const convertor = getConvertor()
    expect(tryInputUntilItFails(convertor.outcomeType)).toMatchSnapshot();
  })

  it('renders market status', () => {
    const convertor = getConvertor()
    expect(tryInputUntilItFails(convertor.marketStatus)).toMatchSnapshot();
  })

  it('renders host type', () => {
    const convertor = getConvertor()
    expect(tryInputUntilItFails(convertor.hostType)).toMatchSnapshot();
  })

  it('renders fixture state', () => {
    const convertor = getConvertor()
    expect(tryInputUntilItFails(convertor.fixtureState)).toMatchSnapshot();
  })

  it('renders game output sample', () => {
    const convertor = getConvertor()
    var gameOutput = getFileContentsFromCurrentDirectory('data/convertor-input-sample.json')
    var gameOutputConverted = convertor.All(JSON.parse(gameOutput))
    expect(gameOutputConverted).toMatchSnapshot()
  })
})
