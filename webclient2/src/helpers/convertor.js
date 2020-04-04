export default class Convertor {
  constructor() {}

  marketType(marketTypeId) {
    return [
      "Home Win Over Under",
      "Flip",
      "Flip On Exact Position",
      "Flip On Exact Order"
    ][marketTypeId];
  }

  outcomeType(outcomeTypeId) {
    return ["Home / Away", "Yes / No", "Over / Under"][outcomeTypeId];
  }

  marketStatus(marketStatusId) {
    return ["Open", "Suspended", "Hidden", "Settled"][marketStatusId];
  }

  hostType(hostTypeId) {
    return ["None", "Home", "Away"][hostTypeId];
  }

  fixtureState(fixtureStateId) {
    return ["Pre Match", "In Play", "Finished"][fixtureStateId];
  }

  outcomes(outcomes) {
    var self = this;
    return outcomes.map(function(o) {
      return {
        TrueProbability: o.TrueProbability,
        HostType: self.hostType(o.HostType),
        OutcomeType: self.outcomeType(o.OutcomeType)
      };
    });
  }

  hostTypes(hostTypes) {
    var self = this;
    return hostTypes.map(function(h) {
      return self.hostType(h);
    });
  }

  markets(markets) {
    var self = this;
    return markets.map(function(market) {
      return {
        Id: market.Id,
        MarketType: self.marketType(market.MarketType),
        Handicap: market.Handicap,
        Outcomes: self.outcomes(market.Outcomes),
        Status: self.marketStatus(market.Status),
        HostTypes: self.hostTypes(market.HostTypes)
      };
    });
  }

  score(score) {
    var self = this;
    return score.map((val, i) => {
      return {
        id: i,
        val: self.hostType(val)
      };
    });
  }

  All(gameOutput) {
    gameOutput.Markets = this.markets(gameOutput.Markets);
    gameOutput.FixtureState = this.fixtureState(gameOutput.FixtureState);
    gameOutput.Score = this.score(gameOutput.Score);
    return gameOutput;
  }
}
