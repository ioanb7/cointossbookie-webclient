let TwoWayMarket = (market, outcome) => {
    return market.MarketType + "-" + market.Handicap + "-" + outcome.HostType
}
export function ExactOrderMarket (hostTypes) {
    return "EXACT_ORDER-" + hostTypes.join("-")
}

export default function outcomeUidGenerator(market, outcome) {
    if (!market) {
        throw "market is null"
    }
    
    switch (market.MarketType) {
        case "Home Win Over Under":
        case "Flip":
        case "Flip On Exact Position":
            return TwoWayMarket(market, outcome)
        case "Flip On Exact Order":
            return ExactOrderMarket(market.HostTypes)
    }
}