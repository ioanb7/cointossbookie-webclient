package Calculator

type Generator struct {
	working_array []int
	result        [][]int
}

func (g *Generator) append() {
	var workingArrayCopy = make([]int, len(g.working_array))
	copy(workingArrayCopy, g.working_array)

	g.result = append(g.result, workingArrayCopy)
}

func (g *Generator) Generate(n int) [][]int {
	g.working_array = []int{}
	g.result = [][]int{}
	for i := 0; i < n; i++ {
		g.working_array = append(g.working_array, 0)
	}

	g.append()
	for i := len(g.working_array) - 1; i > -1; i-- {
		g.resetFor(i)
		g.append()
		g.changeAtI(i)
	}

	return g.result
}

func (g *Generator) resetFor(i int) {
	for j := i; j < len(g.working_array); j++ {
		g.working_array[j] = 0
	}
	g.working_array[i] = 1
}

func (g *Generator) changeAtI(lowerBound int) {
	for thisIter := len(g.working_array) - 1; thisIter > lowerBound; thisIter-- {
		g.resetFor(thisIter)
		g.append()

		g.changeAtI(thisIter)
	}
}
