const Server = require('./src/server/server.js');
const body = require('./src/server/middleware/body.js');
const cookie = require('./src/server/middleware/cookie.js');

const app = new Server({
	port: 3000
});

app.use(body);

app.use(cookie);

app.get('/', (req, res) => {
	console.log(req.body);
	console.log(req.cookie);
	res.render('./index.html', {
		body: JSON.stringify(req.body),
		cookie: JSON.stringify(req.cookie),
	});
});

app.run(() => {
	console.log('Server running on port 3000');
});