package Calculator

type MarketStatus int

const (
	OpenMarketStatus      MarketStatus = iota
	SuspendedMarketStatus MarketStatus = iota
	HiddenMarketStatus    MarketStatus = iota
	SettledMarketStatus   MarketStatus = iota
)

func (s MarketStatus) String() string {
	return [...]string{
		"Open",
		"Suspended",
		"Hidden",
		"Settled"}[s]
}
