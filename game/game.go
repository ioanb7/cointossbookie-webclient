package Game

import (
	"bufio"
	"cointossbookie/Calculator"
	"cointossbookie/ScoutInfo"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"time"
)

type Game struct {
	calculator Calculator.Calculator
	scoreboard ScoreBoard
}

func New() Game {
	g := Game{}
	return g
}

func (g Game) Play() {
	rand.Seed(time.Now().UnixNano())
	scoutinfo := ScoutInfo.New(0.5)
	g.calculator = Calculator.New(&scoutinfo)
	reader := bufio.NewReader(os.Stdin)

	// 0 = pre match, game begins
	// 1 = 1st flip settles, put bets for 2nd flip
	// 2 = 2nd flip settles, put bets for 3rd flip
	// 3 = 3rd flip settles, put bets for 4th flip
	// 4 = 4th flip settles, put bets for 5th flip
	// 5 = 5th flip settles
	// 6 = game finished
	for i := 0; i <= 6; i++ {
		g.showState()
		if err := g.printOdds(); err != nil {
			break
		}
		g.showState()

		if scoutinfo.FixtureState != ScoutInfo.FinishedFixtureState {
			g.playRound(reader, i)
			time.Sleep(500 * time.Millisecond)
			g.endOfRound(i)
		}
	}
}
func (g Game) showState() {
	fmt.Println()
	fmt.Println()
	fmt.Println()

	fmt.Print(g.scoreboard.String(*g.calculator.Scoutinfo))
	fmt.Println()
	g.printScoutInfo()
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
		g.triggerCoinToss()
	case 2:
		g.triggerCoinToss()
	case 3:
		g.triggerCoinToss()
	case 4:
		g.triggerCoinToss()
	case 5:
		g.triggerCoinToss()
		g.calculator.Scoutinfo.Add(ScoutInfo.GameEnded, ScoutInfo.HostTypeNone)
	}
}

func (g Game) triggerCoinToss() {
	var hostType = ScoutInfo.HostTypeHome
	if rand.Intn(2) == 0 {
		hostType = ScoutInfo.HostTypeAway
	}
	g.calculator.Scoutinfo.Add(ScoutInfo.CoinToss, hostType)
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

func (g Game) printScoutInfo() {
	fmt.Printf(g.calculator.Scoutinfo.String())
}

func (g Game) printOdds() error {
	if oddsResult, error := g.String(); error == nil { // .. refactor
		fmt.Printf(oddsResult)
		return nil
	} else {
		fmt.Printf("An error has occured.\n%s\n", error.Error())
		return error
	}
}

func (g Game) String() (string, error) {
	output := fmt.Sprintf("Markets are:\n")
	if markets, e := g.calculator.GetMarkets(); e == nil {
		for _, market := range markets {
			if market.Status != Calculator.OpenMarketStatus {
				if market.Status == Calculator.SettledMarketStatus {
					selectionText := ""
					for _, selection := range market.Selections {
						if selection.TrueProbability == 1.0 {
							selectionText = selection.String()
							break
						}
					}

					output += fmt.Sprintf("Market: %s (settled for %s)\n", market.String(), selectionText)
				} else {
					output += fmt.Sprintf("Market: %s\n", market.String())
				}
			} else {
				output += fmt.Sprintf("Market: %s with selections:\n", market.String())
				for _, selection := range market.Selections {
					output += fmt.Sprintf("%s\n", selection.String())
				}
			}
		}
		return output, nil
	} else {
		return "", e
	}
}
