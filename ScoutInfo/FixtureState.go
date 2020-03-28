package ScoutInfo

type FixtureState int

const (
	PreMatchFixtureState FixtureState = iota
	InPlayFixtureState   FixtureState = iota
	FinishedFixtureState FixtureState = iota
)

func (f FixtureState) String() string {
	return [...]string{
		"Pre Match",
		"In Play",
		"Finished"}[f]
}
