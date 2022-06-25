const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var engine = require('ejs-locals');
var cors = require('cors')




// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

//You can change your views default path:

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
console.log(ip);
  var ip =requestIp.getClientIp(req); 
  res.send("Hello World");
});

const usersRoutes = require('./src/routes/users.routes');
const { url } = require('inspector');
// using as middleware
app.use(cors())


app.use('/api/v1', usersRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

