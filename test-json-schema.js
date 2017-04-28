const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ajv = new Ajv();
const schema = JSON.parse(fs.readFileSync('./schema/league.json'));
const validate = ajv.compile(schema);

const testDataFile = function (filePath) {
	fs.readFile(filePath, (err, data) => {
		if (err) {
			return console.error(`Error reading file ${filePath}: ${err}.`);
		}

		const json = JSON.parse(data);
		const valid = validate(json);
		if (valid) {
			console.log(`${filePath} -> Passed`);
		} else {
			throw new Error(JSON.stringify(validate.errors));
		}
	});
}

const dirPath = './data/json';

fs.readdir(dirPath, (err, files) => {
	if (err) {
		return console.error(`Error reading directory ${dirPath}: ${err}.`);
	}
	if (files.length === 0) {
		return console.error(`No files found in directory ${dirPath}.`);
	}

	files.map(fileName => path.join(dirPath, fileName)).forEach(testDataFile);
});
