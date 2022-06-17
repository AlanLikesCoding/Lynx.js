const _url = require('url');

const parser = {
	parse: (url) => {
		let body = {};
		if (url == null) {
			return null;
		}
		let parts = url.split('&');
		for (let i = 0; i < parts.length; i++) {
			let part = parts[i].split('=');
			body[part[0]] = part[1];
		}
		return body;
	},
	get: (url) => {
		let query = _url.parse(url).query;
		if (query == null || query == '') return null;
		return parser.parse(query);
	},
	post: (req) => {
		data = req.body;
		if (data == null || data == '') return null;
		return parser.parse(data);
	}
}

module.exports = parser;