const parser = require('../parsers/request/body.js');

const parse = (req, res) => {
	let body = {};
	if (req.method != 'POST') body[req.method.toLowerCase()] = parser.get(req.req.url);
	if (req.method == 'POST') body[req.method.toLowerCase()] = parser.post(req.req);
	req.body = body;
}

module.exports = parse;