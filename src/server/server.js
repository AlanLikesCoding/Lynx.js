const http = require('http');
const url = require('url');

const Response = require('./classes/response.js');
const Request = require('./classes/request.js');

class Server {
	constructor(config) {
		this.config = config;
		this.routes = [];
		this.middleware = [];
		this.joined = [];
	}
	run(callback) {
		this.server = http.createServer((req, res) => {
			let data = '';
			req.on('data', (chunk) => {
				data += chunk;
			});
			req.on('end', () => {
				req.body = data;
				this.handle(req, res);
			});
		});
		this.server.listen(this.config.port, () => {
			callback(this.config);
		});
	}
	use(callback) {
		this.middleware.push(callback);
	}
	static(path, dir) {
		this.joined.push({
			path: path,
			dir: dir,
		});
	}
	get(path, callback) {
		this.routes.push({
			path: path,
			method: 'GET',
			callback: callback
		});
	}
	post(path, callback) {
		this.routes.push({
			path: path,
			method: 'POST',
			callback: callback
		});
	}
	put(path, callback) {
		this.routes.push({
			path: path,
			method: 'PUT',
			callback: callback
		});
	}
	delete(path, callback) {
		this.routes.push({
			path: path,
			method: 'DELETE',
			callback: callback
		});
	}
	find(path, method) {
		const _path = require('path');

		for (let i = 0; i < this.routes.length; i++) {
			if (this.routes[i].path === path && this.routes[i].method === method) {
				return {
					static: false,
					data: this.routes[i],
				};
			}
		}
		let dir = _path.dirname(path);
		let filename = _path.basename(path);
		for (let i = 0; i < this.joined.length; i++) {
			if (this.joined[i].path === dir) {
				return {
					static: true,
					path: this.joined[i].dir + '/' + filename,
				}
			}
		}
		return null;
	}
	handle(req, res) {
		let path = url.parse(req.url).pathname;
		let route = this.find(path, req.method);
		let _req = new Request(req.url, req.method, req.headers, req.body, req);
		let _res = new Response(res, 200);
		for (let i = 0; i < this.middleware.length; i++) {
			this.middleware[i](_req, _res);
		}
		if (route == null || route.static == null) {
			res.writeHead(404);
			res.end();
			return;
		}
		if (route.static) {
			let _res = new Response(res, 200);
			_res.file(route.path);
			return;
		}
		route.data.callback(_req, _res);
		return;
	}
}

module.exports = Server;