const read = require('../../helper/fs/read.js');

const render = require('../parsers/render/parser.js');

class Response {
	constructor(res, status) {
		this.res = res;
		this.status = status;
		this.headers = { 'Content-Type': 'text/html' };
		this.body = '';
	}
	send(data, headers = 0) {
		if (headers == 0) {
			this.body = data;
			this.res.writeHead(this.status, this.headers);
			this.res.write(this.body);
			this.res.end();
		}
	}
	json(data) {
		this.headers['Content-Type'] = 'application/json';
		this.send(JSON.stringify(data));
		this.res.end();
	}
	file(url) {
		this.headers['Content-Type'] = 'text/html';
		this.send(read(url));
		this.res.end();
	}
	render(url, data) {
		this.headers['Content-Type'] = 'text/html';
		let parsed = render.parse(read(url).toString());
		let rendered = render.lexer(parsed, data);
		this.send(rendered);
		this.res.end();
	}
}

module.exports = Response;