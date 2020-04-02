class ScorePart extends Component {
    render = () => ( <
        b style = {
            {
                paddingLeft: 10 + 'px'
            }
        } > [{
            this.props.Val
        }] < /b>
    )
}