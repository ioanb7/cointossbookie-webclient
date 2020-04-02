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
        switch (this.props.Outcome.OutcomeType) {
            case "Yes / No":
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
        var betPlacer = < span > < /span>
        if (this.state.Clicked) {
            betPlacer = < BetPlacer Price = {
                this.getPrice()
            }
            />
        }

        return ( <
            div className = "outcome" >
            <
            a onClick = {
                this.onclick
            }
            href = "#" >
            <
            p > < b > {
                this.formatText()
            } < /b></p >
            <
            p > {
                this.getPrice()
            } < /p> <
            /a> {
                betPlacer
            } <
            /div>
        )
    }
}