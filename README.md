# Lynx.js

Lynx.js is a lightweight βοΈ, and speedy β‘οΈ Node.js library for building webservers π. Using it, you easily use the built in modules of Node.js to its full potential π«. Create APIs, build middleware, serve files, and more with Lynx.js.

## Installation

We have finally made an NPM package π¦ for you to install Lynx.js. To do the following, run the `npm install` command like so π:

```bash
npm install lynx-server
```

## Usage

Currently, proper documentation has not been made π, althought it would be appreciated π if you could make pull requests to do so.

### Starting a Server

Before we begin to build a wonderfulπ website with Lynx.js, we will first have to configure our server. To do so, we will need to import the `Server` class. Next, we will initialize the Server class with a config object. Currently, our config object only has one property, `port`, which is the port that our server will listen on. But this will change in the future. Finally, to start the server, we can call the `run` method on our Server instance.

```js
const { Server } = require('lynx-server');

const app = new Server({
  port: 3000,
});

app.run();
```

### Serving a Route

To serve a route using Lynx.js, we will call a method on our Server instance. The method we call will depend on the type of route we are serving. Lynx.js currently supports 4 different methods πͺ: `get`, `post`, `put`, and `delete`.  
Below is an example of what you can do with these methods.

```js
const { Server } = require('lynx-server');

const app = new Server({
   port: 3000,
});

app.get('/', (req, res) => {
  res.send('Hello World!'); // The method res.send will send a response to the client.
});

app.get('/file', (req, res) => {
  res.file('./index.html'); // The method res.file is for serving files.
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Joe',
    age: '21',
  }); // The method res.json is for sending JSON data.
  // Note: You can use req.body.[method] to get the body of the request.
});
app.get('/render', (req, res) => {
    res.render('index.html'); // The method res.render is for rendering templates. More on that later
});

app.run();
```

### Serving a Static Directory

To serve a static directory, you use the `static` method of the Server instance, which takes one parameter, the path to the directory, like so.
```js
const { Server } = require('lynx-server');

const app = new Server({
  port: 3000,
});

app.static('./static'); // The method app.static is for serving static directories.

app.run();
```

### Middleware
To use middleware, you use the `use` method of the Server instance, which takes one parameter, the middleware function.
```js
const { Server } = require('lynx-server');

const app = new Server({
  port: 3000,
});

app.use((req, res) => {
  console.log('Request received');
});
```

### Request Body
To get the parameters of a request, you can use the `body` method of the Request instance. But before that, you must include the body parsing middleware named `BodyParser`, and you can include it along with the `Server` class like so:

```js
const { Server, BodyParser } = require('lynx-server');

const app = new Server({
  port: 3000,
})

app.use(BodyParser);

app.get('/names', (req, res) => {
  const names = ['Bruce', 'Bob', 'Cindy'];

  for(let i = 0; i < names.length; i++) {
    if(names[i] === req.body.name) {
      res.json({
        name: names[i],
        found: true,
      });
    } 
  }

  res.json({
    found: false,
  });
});
```

### Request Cookies
To get the cookies during a request, you must use the cookie parsing middleware. This middleware named `CookieParser` and you can include it along with your `Server` through our NPM package π¦. Next you can get the cookies by using the cookie method from the request instance.
```js
app.get('/cookie', (req, res) => {
  res.json({
    cookie: req.cookie,
  });
});
```

### Rendering
Have you ever wanted to render data from your server directly onto a html template? Well now you can with `res.render`! π The method takes two parameters, the path to the template, and an object of data to pass to the template.

Below is an example, although keep in mind this doesnt include the server initialization, etc. to save space π.

`main.js`
```js
app.get('/render', (req, res) => {
  res.render('index.html', {
    name: 'Joe',
    age: '21'
  });
});
```

`index.html`
```html
<h1>Hello {{name}}!</h1>
<p>You are {{age}} years old.</p>
```

## Contributing

Pull requests are welcome π€. For major changes, please open an issue first to discuss what you would like to change.

## License

[LICENSE](LICENSE.txt)


## Credits
Special thanks to Azure, creator of [Azure.js](https://www.azure-js.com) for helping me come up with such a fabulous π« library name πππ!