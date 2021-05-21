require('dotenv').config();
const cors = require('cors');
const faunadb = require('faunadb');
const express = require('express');
const { join } = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const client = new faunadb.Client({
  secret: process.env.FAUNADB,
});

const {
  Get,
  Map,
  Lambda,
  Documents,
  Collection,
  Paginate,
  Var,
  Ref,
  Create,
  Delete
} = faunadb.query;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'));
});

app.use('/static', express.static('public'));

app.get('/get-users', (req, res) => {
  client.query(
    Map(Paginate(Documents(Collection('users'))), Lambda('i', Get(Var('i'))))
  )
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch((err, data) => {
      if (err) {
        console.log(data);
        res.status(500).send({
          message: 'Something went wrong on our end',
        });
      }
    });
});

app.get('/get-user/:id', (req, res) => {
  const query = client.query(Get(Ref(Collection('users'), req.params.id)));

  query.then((response) => {
    res.status(200).send({
      response,
    });
  });
});

app.post('/create-user', (req, res) => {

  const query = client.query(Create(Collection('users'), {
    data: {
      name: req.body["name"],
      lastname: req.body["lastname"],
      birthDate: req.body["birthDate"],
      img: req.body["img"]
    }
  }));

  query.then((response) => {
    res.status(200).send({
      response
    })
  })
});

app.delete('/delete-user/:id', (req, res) => {
  const query = client.query(
    Delete(
      Ref(Collection('users'), req.params.id)
    )
  )

  query.then((response) => {
    res.status(200).send({
      response
    })
  })
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
