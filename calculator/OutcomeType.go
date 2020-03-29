package Calculator

type OutcomeType int

const (
	OutcomeTypeHomeAway  OutcomeType = iota
	OutcomeTypeYesNo     OutcomeType = iota
	OutcomeTypeOverUnder OutcomeType = iota
)

func (st OutcomeType) String() string {
	return [...]string{
		"Home / Away",
		"Yes / No",
		"Over / Under"}[st]
}
