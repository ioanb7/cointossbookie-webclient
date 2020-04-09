package ScoutInfo

type HostTypeArrayStringify struct {
}

func (x HostTypeArrayStringify) String(hostTypes []HostType) string {
	var output string
	for _, element := range hostTypes {
		toAdd := "[ ]"
		if element == HostTypeHome {
			toAdd = "[H]"
		}
		if element == HostTypeAway {
			toAdd = "[A]"
		}
		output += (toAdd + " ")
	}
	return output
}
