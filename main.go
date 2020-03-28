package main

import (
	"bufio"
	"cointossbookie/Calculator"
	"cointossbookie/ScoutInfo"
	"fmt"
	"os"
	"strconv"
	"time"
)

func main() {
	scoutinfo := ScoutInfo.New(0.6)
	cal := Calculator.New(&scoutinfo)

	for {
		printScoutInfo(&scoutinfo)
		if err := printOdds(&cal); err != nil {
			break
		}

		fmt.Println("If you wanna put a place, type 0 (home) or 1 (away)")
		reader := bufio.NewReader(os.Stdin)
		line, _, _ := reader.ReadLine()
		lineInput := string(line)
		if hostType, err := strconv.ParseInt(lineInput, 10, 32); err == nil {
			switch lineInput {
			case "0":
				fallthrough
			case "1":
				fmt.Println("How much?")
				line, _, _ = reader.ReadLine()
				lineInput = string(line)
				if f, err := strconv.ParseFloat(lineInput, 32); err == nil {
					printPriceForBet(&cal, Calculator.HostType(hostType), float32(f))
				}
			}
		} else {
			fmt.Printf("Erorr parsing line input for host type: %s\n", lineInput)
		}

		time.Sleep(2 * time.Second) // or runtime.Gosched() or similar per @misterbee
		scoutinfo.Add(ScoutInfo.GameStarted)
	}
}

func printPriceForBet(cal *Calculator.Calculator, hostType Calculator.HostType, bet float32) error {
	if yourPotentialResult, error := cal.GetPriceForBet(hostType, bet); error == nil {
		fmt.Printf("You might win: %.3f\n", yourPotentialResult)
		return nil
	} else {
		fmt.Printf("An error has occured.\n%s\n", error.Error())
		return error
	}
}

func printOdds(cal *Calculator.Calculator) error {
	if oddsResult, error := cal.String(); error == nil {
		fmt.Printf(oddsResult)
		return nil
	} else {
		fmt.Printf("An error has occured.\n%s\n", error.Error())
		return error
	}
}

func printScoutInfo(s *ScoutInfo.ScoutInfo) {
	fmt.Printf(s.String())
}
