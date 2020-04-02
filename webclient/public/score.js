class Score extends Component {

    props = {
        FixtureState: "Connecting...",
        Val: []
    }
    render = () => ( <
        div >
        <
        h1 className = "text-6xl font-bold text-gray-100 uppercase tracking-wider" > {
            this.props.FixtureState
        } <
        /h1> <
        div > {
            this.props.Val.map((hostType, i) => {
                return <ScorePart key = {
                    i
                }
                Val = {
                    hostType
                }
                />
            })
        } <
        /div> <
        /div>
    )
}