# soccer-bookmaker-odds

> Historical data of bookmaker odds for some of the major soccer European leagues.

[![Build Status: Linux](https://api.travis-ci.org/iredchuk/soccer-bookmaker-odds.svg?branch=master)](https://api.travis-ci.org/iredchuk/soccer-bookmaker-odds)

[Data](https://github.com/iredchuk/soccer-bookmaker-odds/tree/master/data) includes teams, scores and average bookmaker odds for all games since 2005-2006 season for the following leagues:
* English Premier League
* Spanish Primera
* German Bundesliga
* Italian Serie A
* French Ligue 1

## Data format
[Data](https://github.com/iredchuk/soccer-bookmaker-odds/tree/master/data) is available in JSON and CSV formats.

Every file represents historical data for a certain league.

**JSON data** in every file is an array of seasons, each containing array of numbered rounds (fixtures) in this season, with each round containing array of games in this round.

Every game object has the following properties:
* `hTeam` (`string`) - Home team name
* `aTeam` (`string`) - Away team name
* `hScore` (`integer`) - Home team score
* `aScore` (`integer`) - Away team score
* `hOdd` (`float`) - Average bookmaker odds for the home team in the [decimal format](https://en.wikipedia.org/wiki/Fixed-odds_betting#Decimal_odds)
* `dOdd` (`float`) - Odds for draw
* `aOdd` (`float`) - Odds for away team
* `hProb` (`float`) - Normalized probability of the home team victory calculated from the odds (see below)
* `dProb` (`float`) - Probability of the draw
* `aProb` (`float`) - Probability of the away team victory

For example, normalized probability for the home team victory is calculated in the following way:

`hProb = 1/hOdd / (1/hOdd + 1/dOdd + 1/aOdd)`

For more details, see [JSON schema](https://github.com/iredchuk/soccer-bookmaker-odds/blob/master/schema/league.json).

**CSV data format** is the flattened representation of the JSON structure, with each rows representing a game with the same columns as JSON properties described above, plus season and round columns.

## Testing JSON data against the schema
[Node.js](https://nodejs.org/) version 6 or later and [npm](https://www.npmjs.com/) need to be installed.

Execute:
```console
$ npm install
$ npm test
```

Or, with [yarn](https://yarnpkg.com/):
```console
$ yarn
$ yarn test
```
