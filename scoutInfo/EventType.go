package ScoutInfo

type EventType int

const (
	GameStarted   EventType = iota
	GameEnded     EventType = iota
	GamePaused    EventType = iota
	GameCancelled EventType = iota
	CoinToss      EventType = iota
)

func (e EventType) String() string {
	return [...]string{
		"GameStarted",
		"GameEnded",
		"GamePaused",
		"GameCancelled",
		"CoinToss"}[e]
}
