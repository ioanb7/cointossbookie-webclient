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
        var handicap = < span > < /span>;

        if (this.formatHandicap(this.props.Market) != "") {
            handicap = < b > ({
                this.formatHandicap(this.props.Market)
            }) < /b>
        }

        return ( <
            div className = "market" >
            <
            header >
            <
            b > {
                this.props.Market.MarketType
            } < /b> {
                handicap
            } <
            /header> <
            div className = "order" > {
                this.props.Market.HostTypes.map((h, i) => {
                    if (h == "Home") {
                        return ( <
                            b style = {
                                {
                                    color: 'black'
                                }
                            } >
                            <
                            i >
                            <
                            ScorePart Val = {
                                h
                            }
                            /> <
                            /i> <
                            /b>
                        )
                    } else {
                        return <ScorePart Val = {
                            h
                        }
                        />
                    }
                })
            } <
            /div> <
            div className = "outcomes" > {
                this.props.Market.Outcomes.map((outcome, i) => {
                    return <Outcome key = {
                        i
                    }
                    Outcome = {
                        outcome
                    }
                    />
                })
            } <
            /div> <
            /div>
        );
    }
}
