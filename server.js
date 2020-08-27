const http = require('http'); //import syntax in node equivalent to import .. from 
//provides functionalities for the server to run
const app = require('./app');
const port = process.env.PORT || 3000;

const server=http.createServer(app)

console.log(port);

server.listen(port); // starts listening on port
