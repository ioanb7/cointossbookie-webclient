export default class Convertor {
  constructor() {}

  marketType = (marketTypeId) => {
    return [
      "Home Win Over Under",
      "Flip",
      "Flip On Exact Position",
      "Flip On Exact Order",
    ][marketTypeId];
  };

  outcomeType = (outcomeTypeId) => {
    return ["Home / Away", "Yes / No", "Over / Under"][outcomeTypeId];
  };

  marketStatus = (marketStatusId) => {
    return ["Open", "Suspended", "Hidden", "Settled"][marketStatusId];
  };

  hostType = (hostTypeId) => {
    return ["None", "Home", "Away"][hostTypeId];
  };

  fixtureState = (fixtureStateId) => {
    return ["Pre Match", "In Play", "Finished"][fixtureStateId];
  };

  outcomes = (outcomes) => {
    return outcomes.map((o) => ({
      TrueProbability: o.TrueProbability,
      HostType: this.hostType(o.HostType),
      OutcomeType: this.outcomeType(o.OutcomeType),
    }));
  };

  hostTypes = (hostTypes) => {
    return hostTypes.map((h) => this.hostType(h));
  };

  markets = (markets) => {
    return markets.map((market) => ({
      Id: market.Id,
      MarketType: this.marketType(market.MarketType),
      Handicap: market.Handicap,
      Outcomes: this.outcomes(market.Outcomes),
      Status: this.marketStatus(market.Status),
      HostTypes: this.hostTypes(market.HostTypes),
    }));
  };

  score(score) {
    return score.map((val, i) => ({
      id: i,
      val: this.hostType(val),
    }));
  }

  All(gameOutput) {
    return {
      GameId: gameOutput.id,
      Markets: this.markets(gameOutput.Markets),
      Score: this.score(gameOutput.Score),
      FixtureState: this.fixtureState(gameOutput.FixtureState),
    };
  }
}
