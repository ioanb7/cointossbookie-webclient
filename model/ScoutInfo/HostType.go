package ScoutInfo

type HostType int

const (
	HostTypeNone HostType = iota
	HostTypeHome HostType = iota
	HostTypeAway HostType = iota
)

func (h HostType) String() string {
	return [...]string{
		"None",
		"Home",
		"Away"}[h]
}
