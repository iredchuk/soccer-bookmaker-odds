const fs = require("fs");
const path = require("path");
const assert = require("assert").strict;
const Ajv = require("ajv");

const ajv = new Ajv();
const schema = JSON.parse(fs.readFileSync("./schema/league.json"));
const validate = ajv.compile(schema);

const testFileIsComplete = (data, filePath) => {
	const teamsCount = filePath.includes("germany") ? 18 : 20;
	const expectedRounds = 2 * (teamsCount - 1);
	const expectedGames = teamsCount / 2;

	data.forEach(season => {
		assert.equal(
			season.rounds.length,
			expectedRounds,
			`Wrong rounds count in ${filePath}, season ${season.season}`
		);

		season.rounds.forEach(round => {
			assert.equal(
				round.games.length,
				expectedGames,
				`Wrong games count in ${filePath}, season ${season.season}, round ${round.round}`
			);
		});
	});
};

const testDataFile = filePath => {
	const json = fs.readFileSync(filePath);
	const data = JSON.parse(json);

	const valid = validate(data);
	assert(valid, JSON.stringify(validate.errors));

	testFileIsComplete(data, filePath);

	console.log(`${filePath} -> Passed`);
};

const dirPath = "./data/json";
const fileNames = fs.readdirSync(dirPath);
assert.notEqual(fileNames.length, 0, `No files found in directory ${dirPath}.`);
fileNames.map(fileName => path.join(dirPath, fileName)).forEach(testDataFile);
