// Loads the configuration from config.env to process.env
//require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');
// get MongoDB driver connection
const dbo = require('./db/conn');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();
let session = require('express-session')
let fileUpload = require('express-fileupload')

app.use(cors());

app.use(express.json());
app.use(express.text()) // this is for plan/text format
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(session({
  secret: process.env.SECRETSESSION,
  cookie: { maxAge: 60000 }
}));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir: path.join(__dirname, './tmp')
}));
app.use(require('./routes/views'));
app.set('view engine', 'ejs');

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
