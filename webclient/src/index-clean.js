import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class App extends Component {
    wsClient = null;
    state = {
        counter: 'Loading..',
        clientId: null,
        connState: null,
        GameId: 0,
        Markets: [],
        FixtureState: "Loading...",
        Score: []
    };

    readyStates = {
        0: 'CONNECTING',
        1: 'OPEN',
        2: 'CLOSING',
        3: 'CLOSED'
    };

    bgs = {
        CONNECTING: 'bg-blue-500',
        OPEN: 'bg-green-500',
        CLOSING: 'bg-orange-500',
        //CLOSED: 'bg-red-500'
        CLOSED: 'bg-blue-500'
    };

    componentDidMount = () => {
        this.wsClient = new WebSocket('ws://localhost:7777/status');
        this.wsClient.binaryType = "arraybuffer";

        this.wsClient.onopen = this.handleOpen;
        this.wsClient.onerror = this.handleError;
        this.wsClient.onmessage = this.handleMessage;
        this.wsClient.onclose = this.handleClose;


        //this.setState(JSON.parse(cached))
    };

    handleOpen = () => {
        console.log('ws connection opened');
        this.forceUpdate();
    };

    handleError = error => {
        console.error('ws error', error);
        this.forceUpdate();
    };

    handleClose = () => {
        console.error('ws connection closed');
        this.forceUpdate();
    };

    marketType = marketTypeId => {
        return [
            "Home Win Over Under",
            "Flip",
            "Flip On Exact Position",
            "Flip On Exact Order"
        ][marketTypeId]
    }

    outcomeType = outcomeTypeId => {
        return [
            "Home / Away",
            "Yes / No",
            "Over / Under"
        ][outcomeTypeId]
    }

    marketStatus = marketStatusId => {
        return [
            "Open",
            "Suspended",
            "Hidden",
            "Settled"
        ][marketStatusId]
    }

    hostType = hostTypeId => {
        return [
            "None",
            "Home",
            "Away"
        ][hostTypeId]
    }

    fixtureState = fixtureStateId => {
        return [
            "Pre Match",
            "In Play",
            "Finished"
        ][fixtureStateId]
    }

    handleMessage = event => {
        const gameOutput = JSON.parse(event.data);
        var self = this;
        gameOutput.Markets = gameOutput.Markets.map(function (m) {
            var outcomes = m.Outcomes.map(function (o) {
                return {
                    TrueProbability: o.TrueProbability,
                    HostType: self.hostType(o.HostType),
                    OutcomeType: self.outcomeType(o.OutcomeType)
                };
            });

            var hostTypes = m.HostTypes.map(function (h) {
                return self.hostType(h)
            });

            return {
                Id: m.Id,
                MarketType: self.marketType(m.MarketType),
                Handicap: m.Handicap,
                Outcomes: outcomes,
                Status: self.marketStatus(m.Status),
                HostTypes: hostTypes
            };
        });
        gameOutput.Score = gameOutput.Score.map(function (h) {
            return self.hostType(h)
        });
        gameOutput.FixtureState = self.fixtureState(gameOutput.FixtureState)
        this.setState(gameOutput);
    };

    bg = () => this.wsClient && this.bgs[this.readyStates[this.wsClient.readyState]]

    outcome = (o) => ( <
        b > {
            o.TrueProbability
        } < /b>
    )

    render = () => (
        // TODO: no markets to display.

        <
        div className = {
            `${this.bg() || ''} h-full`
        } >
        <
        div className = {
            `flex flex-col items-center pt-48`
        } >
        <
        Score Id = {
            this.state.GameId
        }
        FixtureState = {
            this.state.FixtureState
        }
        Val = {
            this.state.Score
        }
        /> <
        h2 > Markets: < /h2> {
            this.state.Markets.filter(function (item) {
                return item.Status == "Open";
            }).map((market, i) => {
                return <Market key = {
                    market.Id
                }
                Market = {
                    market
                }
                />
            })
        } <
        /div> <
        /div>
    );
}

/*

        {this.state.clientId != null && (
          <div className="text-normal text-white opacity-75 uppercase text-sm tracking-wider">
            <span className="mr-1">Your ID:</span>
            <span className="font-bold">{this.state.clientId}</span>
          </div>
        )}

        <div className="w-1/2 px-5 mt-16 pt-5 pb-0 text-center text-white uppercase tracking-wider">
          <span className="mr-1 opacity-50">Connection:</span>
          <span className="font-bold">
            {(this.wsClient && this.readyStates[this.wsClient.readyState]) || 'Connecting...'}
          </span>
        </div>*/

ReactDOM.render( < App / > , document.getElementById('root'));
