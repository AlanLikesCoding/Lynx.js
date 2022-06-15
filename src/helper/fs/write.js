const fs = require('fs');

const write = (path, data) => {
	fs.writeFileSync(path, data);
}

module.exports = write;