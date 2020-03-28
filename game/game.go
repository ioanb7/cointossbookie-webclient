package Game

import (
	"bufio"
	"cointossbookie/Calculator"
	"cointossbookie/ScoutInfo"
	"fmt"
	"os"
	"strconv"
	"time"
)

type Game struct {
	calculator Calculator.Calculator
}

func New() Game {
	g := Game{}
	return g
}

func (g Game) Play() {
	scoutinfo := ScoutInfo.New(0.6)
	g.calculator = Calculator.New(&scoutinfo)

	// 0 = pre match, put bets for 1st flip
	// 1 = in play round 1, put bets for 2nd flip
	// 2 = in play round 2, put bets for 3rd flip
	// 3 = in play round 3, put bets for 4th flip
	// 4 = in play round 4, put bets for 5th flip
	// 5 = game ends
	for i := 0; i < 6; i++ {
		g.printScoutInfo(&scoutinfo)
		if err := g.printOdds(); err != nil {
			break
		}

		reader := bufio.NewReader(os.Stdin)
		g.playRound(reader, i)

		time.Sleep(2 * time.Second)

		fmt.Println()
		fmt.Println()
		fmt.Println("New round...")
		fmt.Println()
		fmt.Println()
		g.endOfRound(i)
	}
}

func (g Game) playRound(reader *bufio.Reader, nth int) {
	marketID := g.getInputAsInt(reader, "Market id? (enter 0)")
	if marketID != 0 {
		return
	}

	hostTypeInt := g.getInputAsInt(reader, "If you wanna put a place, type 0 (home) or 1 (away)")
	betValue := g.getInputAsFloat(reader, "How much?")

	if marketID != 0 {
		fmt.Printf("Invalid market id: %d\n", marketID)
	} else if !(hostTypeInt == 0 || hostTypeInt == 1) {
		fmt.Printf("Invalid host type: %d\n", hostTypeInt)
	} else if betValue < 1.0 || betValue > 10000.0 {
		fmt.Printf("Invalid bet value: %f\n", betValue)
	} else {
		var marketType Calculator.MarketType = Calculator.HomeWinOverUnderMarketType
		if marketID == 0 {
			marketType = Calculator.NthFlipMarketType
		}
		g.printPriceForBet(marketType, ScoutInfo.HostType(hostTypeInt+1), betValue)
	}
}

func (g Game) endOfRound(nth int) {
	switch nth {
	case 0:
		g.calculator.Scoutinfo.Add(ScoutInfo.GameStarted, ScoutInfo.HostTypeNone)
	case 1:
		g.calculator.Scoutinfo.Add(ScoutInfo.CoinToss, ScoutInfo.HostTypeHome)
	case 2:
		g.calculator.Scoutinfo.Add(ScoutInfo.CoinToss, ScoutInfo.HostTypeHome)
	case 3:
		g.calculator.Scoutinfo.Add(ScoutInfo.CoinToss, ScoutInfo.HostTypeHome)
	case 4:
		g.calculator.Scoutinfo.Add(ScoutInfo.CoinToss, ScoutInfo.HostTypeHome)
	case 5:
		g.calculator.Scoutinfo.Add(ScoutInfo.CoinToss, ScoutInfo.HostTypeAway)
		g.calculator.Scoutinfo.Add(ScoutInfo.GameEnded, ScoutInfo.HostTypeNone)
	}
}

func (g Game) getInputAsInt(reader *bufio.Reader, outputFirst string) int {
	fmt.Println(outputFirst)
	line, _, _ := reader.ReadLine()
	lineInput := string(line)
	if hostType, err := strconv.ParseInt(lineInput, 10, 32); err == nil {
		return int(hostType)
	} else {
		fmt.Printf("Erorr parsing line input: %s\n", lineInput)
		return -1
	}
}

func (g Game) getInputAsFloat(reader *bufio.Reader, outputFirst string) float32 {
	fmt.Println(outputFirst)
	line, _, _ := reader.ReadLine()
	lineInput := string(line)
	if f, err := strconv.ParseFloat(lineInput, 32); err == nil {
		return float32(f)
	} else {
		fmt.Printf("Erorr parsing line input: %s\n", lineInput)
		return -1
	}
}

func (g Game) printPriceForBet(marketType Calculator.MarketType, hostType ScoutInfo.HostType, bet float32) error {
	if yourPotentialResult, error := g.calculator.GetPriceForBet(marketType, hostType, bet); error == nil {
		fmt.Printf("You might win: %.3f\n", yourPotentialResult)
		return nil
	} else {
		fmt.Printf("An error has occured.\n%s\n", error.Error())
		return error
	}
}

func (g Game) printOdds() error {
	if oddsResult, error := g.calculator.String(); error == nil {
		fmt.Printf(oddsResult)
		return nil
	} else {
		fmt.Printf("An error has occured.\n%s\n", error.Error())
		return error
	}
}

func (g Game) printScoutInfo(s *ScoutInfo.ScoutInfo) {
	fmt.Printf(s.String())
}
