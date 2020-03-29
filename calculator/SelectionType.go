package Calculator

type SelectionType int

const (
	SelectionTypeHomeAway  SelectionType = iota
	SelectionTypeYesNo     SelectionType = iota
	SelectionTypeOverUnder SelectionType = iota
)

func (st SelectionType) String() string {
	return [...]string{
		"Home / Away",
		"Yes / No",
		"Over / Under"}[st]
}
