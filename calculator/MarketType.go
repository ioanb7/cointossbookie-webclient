package Calculator

type MarketType int

const (
	HomeWinOverUnderMarketType  MarketType = iota
	AwayWinOverUnderMarketType  MarketType = iota
	NthFlipMarketType           MarketType = iota
	NthFlipExactMarketType      MarketType = iota
	NthFlipExactOrderMarketType MarketType = iota
)

func (m MarketType) String() string {
	return [...]string{
		"Home Win Over Under",
		"Home Win Over Under",
		"Flip",
		"Flip On Home/Away",
		"Flip On Exact Order"}[m]
}
