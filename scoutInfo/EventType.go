package ScoutInfo

type EventType int

const (
	GameStarted   EventType = iota
	GameEnded     EventType = iota
	GamePaused    EventType = iota
	GameCancelled EventType = iota
	CoinTossHome  EventType = iota
	CoinTossAway  EventType = iota
)

func (e EventType) String() string {
	return [...]string{
		"GameStarted",
		"GameEnded",
		"GamePaused",
		"GameCancelled",
		"CoinTossHome",
		"CoinTossAway"}[e]
}
