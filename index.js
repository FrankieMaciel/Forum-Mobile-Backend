const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const router = require(path.resolve(__dirname, 'src', 'routes', 'router'));
app.use(router);
app.use('/public', express.static(path.join(__dirname, 'public')))

// DATABASE
const dbConn = 'Database connected';
const database = require(
  path.resolve(__dirname, 'src', 'database', 'mongo')
);
database.connect()
.then(() => {
  console.log(dbConn);
  app.emit(dbConn);
}).catch(err => console.log(err));

app.use(database.sessionOptions);
app.use(database.flash());

app.on(dbConn, () => app.listen(port, () => {
  console.log(`Server listening on port ${port} | Access http://localhost:${port}`);
}));
