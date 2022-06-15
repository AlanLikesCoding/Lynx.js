const fs = require('fs');

const read = (path) => {
	return fs.readFileSync(path);
}

module.exports = read;