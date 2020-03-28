package Calculator

type HostType int

const (
	HostTypeHome HostType = iota
	HostTypeAway HostType = iota
)

func (h HostType) String() string {
	return [...]string{
		"Home",
		"Away"}[h]
}
