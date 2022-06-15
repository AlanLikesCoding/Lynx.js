class Request {
	constructor(path, method, headers, body, req) {
		this.path = path;
		this.method = method;
		this.headers = headers;
		this.body = body;
		this.req = req;
	}
}

module.exports = Request;