import AppComponent from 'src/App';

const express = require('express');
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
const React = require('react');
const ReactDOMServer = require('react-dom/server');


const app = express();

// configure Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  fs.readFile(path.join(__dirname, '../build', 'index.html'), 'utf8', (err, htmlData) => {
    if (err) {
      console.error(err);
      return res.status(404).end()
    };
    const html = ReactDOMServer.renderToString(<AppComponent />);

    res.send(htmlData.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`));
  });
  // // res.sendFile(path.join(__dirname, '../build', 'index.html'));
  // const jsx = <div> Hello </div>;
  // res.writeHead(200, { 'Content-Type': 'text/html' });

  // res.end(htmlTemplate(reactDom));
});
app.use(express.static(path.join(__dirname, '../build')));

app.listen(9000, () => {
  console.log('Listening on localhost:9000');
});

