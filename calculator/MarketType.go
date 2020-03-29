package Calculator

type MarketType int

const (
	HomeWinOverUnderMarketType  MarketType = iota
	NthFlipMarketType           MarketType = iota
	NthFlipExactMarketType      MarketType = iota
	NthFlipExactOrderMarketType MarketType = iota
)

func (m MarketType) String() string {
	return [...]string{
		"Home Win Over Under",
		"Flip",
		"Flip On Exact Position",
		"Flip On Exact Order"}[m]
}
