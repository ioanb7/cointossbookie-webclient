import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class BetPlacer extends Component {
  state = {
    betValue: 2,
    //earnings: 0
  }

  constructor(props) {
    super(props);

    this.onbet = this.onbet.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({earnings: this.calculate()});
  }

  calculate = () => {
    //console.log("bet value:" + this.state.betValue)
    //console.log("bet:" + bet)

    var bet = parseFloat(this.state.betValue)
    var price = this.props.Price

    //console.log("bet value:" + this.state.betValue)
    //console.log("bet:" + bet)

    var winnings = bet + bet*price
    var result = winnings.toFixed(2)
    //console.log("final result with float:" + result)
    return result
  }

  onbet = (e) => {
    e.preventDefault();
  }

  handleChange(event) {
    this.setState({
      betValue: event.target.value,
      earnings: this.calculate()
    });
    //console.log("this.calculate:" + this.calculate())
    //console.log("state:" + this.state.earnings)

  }
  
  render = () => {
    return (
      <div className="betplacer">
        <p><input type="text" val={this.state.betValue} onChange={this.handleChange} label="How much would you like to bet?"/><b>io</b></p>
        <p>Estimated winnings: {this.calculate()}<b>io</b></p>
        <p><a onClick={this.onclick} href="#">Bet</a></p>
      </div>
    )
  }
}


class Outcome extends Component {

  constructor(props) {
    super(props);

    this.onclick = this.onclick.bind(this);
  }
  state = {
    Clicked: false
  }
  getPrice = () => {
    return this.props.Outcome.TrueProbability * 1.05
  }

  formatText = () => {
    var outcomeName = this.props.Outcome.HostType
    switch( this.props.Outcome.OutcomeType) {
      case "Yes / No" :
        outcomeName = "Yes"
        if (this.props.Outcome.HostTypes == "Away") {
          outcomeName = "No"
        }
      case "Over / Under":
        outcomeName = "Over"
        if (this.props.Outcome.HostTypes == "Away") {
          outcomeName = "Under"
        }
    }
    return outcomeName
  }

  onclick = (e) => {
    e.preventDefault();
    this.setState({
      Clicked: !this.state.Clicked
    })
  }

  render = () => {
    var betPlacer = <span></span>
    if (this.state.Clicked) {
      betPlacer = <BetPlacer Price={this.getPrice()}/>
    } 

    return (
      <div className="outcome">
        <a onClick={this.onclick} href="#">
          <p><b>{this.formatText()}</b></p>
          <p>{this.getPrice()}</p>
        </a>
        {betPlacer}
      </div>
    )
  }
}

class Market extends Component {
  
  formatHandicap = (m) => {

    var handicap = m.Handicap.toFixed(2);

    if (parseInt(m.Handicap, 10).toFixed(2) == m.Handicap) {
      handicap = m.Handicap.toFixed(0);
    } else {
      if (handicap[handicap.length - 1] == "0") {
        handicap = m.Handicap.toFixed(1);
      }
    }

    if (handicap < 0.001) {
      handicap = ""
    }
    return handicap 
    /*

    if len(m.HostTypes) > 0 {
      var hostTypeArrayStringify = ScoutInfo.HostTypeArrayStringify{}
      output += " " + hostTypeArrayStringify.String(m.HostTypes)
    }*/
  }
  //<b>{this.props.Market.Status}</b>

  render = () => {
    var handicap = <span></span>;

    if (this.formatHandicap(this.props.Market) != "") {
      handicap = <b> ({this.formatHandicap(this.props.Market)})</b>
    }

    return (
      <div className="market">
        <header>
          <b>{this.props.Market.MarketType}</b>
          {handicap}
        </header>
        <div className="order">
          {this.props.Market.HostTypes.map((h, i) => {
            if (h == "Home") {
              return (
                <b style={{color: 'black'}}>
                  <i>
                  <ScorePart Val={h}/>
                  </i>
                </b>
              )
            } else {
              return <ScorePart Val={h}/>
            }
          })}
        </div>
        <div className="outcomes">
          {this.props.Market.Outcomes.map((outcome, i) => {
            return <Outcome key={i} Outcome={outcome}/>
          })}
        </div>
      </div>
    );
        }
}

class ScorePart extends Component {
  render = () => (
    <b style={{paddingLeft: 10 +'px'}}>[{this.props.Val}] </b>
  )
}

class Score extends Component {

  props = {
    FixtureState: "Connecting...",
    Val: []
  }
  render = () => (
    <div>
    <h1 className="text-6xl font-bold text-gray-100 uppercase tracking-wider">
      {this.props.FixtureState}
    </h1>
    <div>
      {this.props.Val.map((hostType, i) => {
        return <ScorePart key={i} Val={hostType}/>
      })}
    </div>
    </div>
  )
}

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

    var cached = "{\"Markets\":[{\"Id\":0,\"MarketType\":\"Flip\",\"Handicap\":1,\"Outcomes\":[{\"TrueProbability\":0.5,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":0.5,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":1,\"MarketType\":\"Flip\",\"Handicap\":2,\"Outcomes\":[{\"TrueProbability\":0.5,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":0.5,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":2,\"MarketType\":\"Flip\",\"Handicap\":3,\"Outcomes\":[{\"TrueProbability\":0.5,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":0.5,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":3,\"MarketType\":\"Flip\",\"Handicap\":4,\"Outcomes\":[{\"TrueProbability\":0.5,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":0.5,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":4,\"MarketType\":\"Flip\",\"Handicap\":5,\"Outcomes\":[{\"TrueProbability\":0.5,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":0.5,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":5,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":1,\"Outcomes\":[{\"TrueProbability\":0.5,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":0.5,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":6,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":2,\"Outcomes\":[{\"TrueProbability\":1,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":1,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":7,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":3,\"Outcomes\":[{\"TrueProbability\":2,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":2,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":8,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":4,\"Outcomes\":[{\"TrueProbability\":4,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":4,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":9,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":5,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Home \/ Away\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Home \/ Away\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":10,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Home\",\"Home\",\"Home\",\"Home\"]},{\"Id\":11,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Home\",\"Home\",\"Home\",\"Away\"]},{\"Id\":12,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Home\",\"Home\",\"Away\",\"Home\"]},{\"Id\":13,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Home\",\"Home\",\"Away\",\"Away\"]},{\"Id\":14,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Home\",\"Away\",\"Home\",\"Home\"]},{\"Id\":15,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Home\",\"Away\",\"Home\",\"Away\"]},{\"Id\":16,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Home\",\"Away\",\"Away\",\"Home\"]},{\"Id\":17,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Home\",\"Away\",\"Away\",\"Away\"]},{\"Id\":18,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Away\",\"Home\",\"Home\",\"Home\"]},{\"Id\":19,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Away\",\"Home\",\"Home\",\"Away\"]},{\"Id\":20,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Away\",\"Home\",\"Away\",\"Home\"]},{\"Id\":21,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Away\",\"Home\",\"Away\",\"Away\"]},{\"Id\":22,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Away\",\"Away\",\"Home\",\"Home\"]},{\"Id\":23,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Away\",\"Away\",\"Home\",\"Away\"]},{\"Id\":24,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Away\",\"Away\",\"Home\",\"Away\"]},{\"Id\":25,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Away\",\"Away\",\"Away\",\"Home\"]},{\"Id\":26,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Home\",\"Away\",\"Away\",\"Away\",\"Away\"]},{\"Id\":27,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Home\",\"Home\",\"Home\",\"Home\"]},{\"Id\":28,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Home\",\"Home\",\"Home\",\"Away\"]},{\"Id\":29,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Home\",\"Home\",\"Away\",\"Home\"]},{\"Id\":30,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Home\",\"Home\",\"Away\",\"Away\"]},{\"Id\":31,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Home\",\"Away\",\"Home\",\"Home\"]},{\"Id\":32,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Home\",\"Away\",\"Home\",\"Away\"]},{\"Id\":33,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Home\",\"Away\",\"Home\",\"Away\"]},{\"Id\":34,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Home\",\"Away\",\"Away\",\"Home\"]},{\"Id\":35,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Home\",\"Away\",\"Away\",\"Away\"]},{\"Id\":36,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Home\",\"Home\",\"Home\"]},{\"Id\":37,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Home\",\"Home\",\"Away\"]},{\"Id\":38,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Home\",\"Home\",\"Away\"]},{\"Id\":39,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Home\",\"Away\",\"Home\"]},{\"Id\":40,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Home\",\"Away\",\"Away\"]},{\"Id\":41,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Home\",\"Away\",\"Away\"]},{\"Id\":42,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Home\",\"Away\",\"Home\"]},{\"Id\":43,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Home\",\"Away\",\"Away\"]},{\"Id\":44,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Away\",\"Home\",\"Home\"]},{\"Id\":45,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Away\",\"Home\",\"Away\"]},{\"Id\":46,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Away\",\"Home\",\"Away\"]},{\"Id\":47,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Away\",\"Away\",\"Home\"]},{\"Id\":48,\"MarketType\":\"Flip On Exact Position\",\"Handicap\":0,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Yes \/ No\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Yes \/ No\"}],\"Status\":\"Open\",\"HostTypes\":[\"Away\",\"Away\",\"Away\",\"Away\",\"Away\"]},{\"Id\":49,\"MarketType\":\"Home Win Over Under\",\"Handicap\":0.5,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Over \/ Under\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Over \/ Under\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":50,\"MarketType\":\"Home Win Over Under\",\"Handicap\":1.5,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Over \/ Under\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Over \/ Under\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":51,\"MarketType\":\"Home Win Over Under\",\"Handicap\":2.5,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Over \/ Under\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Over \/ Under\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":52,\"MarketType\":\"Home Win Over Under\",\"Handicap\":3.5,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Over \/ Under\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Over \/ Under\"}],\"Status\":\"Open\",\"HostTypes\":[]},{\"Id\":53,\"MarketType\":\"Home Win Over Under\",\"Handicap\":4.5,\"Outcomes\":[{\"TrueProbability\":8,\"HostType\":\"Home\",\"OutcomeType\":\"Over \/ Under\"},{\"TrueProbability\":8,\"HostType\":\"Away\",\"OutcomeType\":\"Over \/ Under\"}],\"Status\":\"Open\",\"HostTypes\":[]}],\"FixtureState\":\"Pre Match\",\"Score\":[\"None\",\"None\",\"None\",\"None\",\"None\"]}"

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

    this.setState(gameOutput);
  };

  bg = () => this.wsClient && this.bgs[this.readyStates[this.wsClient.readyState]]

  outcome = (o) => (
    <b>{o.TrueProbability}</b>
  )

  render = () => (
    // TODO: no markets to display.

    <div className={`${this.bg() || ''} h-full`}>
      <div className={`flex flex-col items-center pt-48`}>
          <Score Id={this.state.GameId} FixtureState={this.state.FixtureState} Val={this.state.Score}/>
        <h2>Markets:</h2>
        {this.state.Markets.filter(function (item) {
          return item.Status == "Open";
        }).map((market, i) => {
          return <Market key={market.Id} Market={market}/>
        })}
      </div>
    </div>
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

ReactDOM.render(<App />, document.getElementById('root'));
