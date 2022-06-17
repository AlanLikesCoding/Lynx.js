const parser = require('../parsers/request/cookie.js');

const parse = (req, res) => {
	let cookie = parser(req.req.headers.cookie);
	req.cookie = cookie;
}

module.exports = parse;