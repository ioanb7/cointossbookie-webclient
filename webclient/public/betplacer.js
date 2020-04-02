
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