# FaunaDB API
By Daniel Medina

This project consists of a rest api that uses FaunaDB as the database to store its contents. It is used in my [react app](https://react.danielmedina.dev/effect) to save and display arbitrary users. It can get all users, get one user, create a user, and delete users, next thing I want to add is the functionality to update users.

It is built using NodeJS and the FaunaDB driver for node. It comes bundled with a web view of the database contents that can be accessed through the root URL. [example](https://medina.dev/faunadb/)

## Environment Variables

1. PORT: Port number in which to bind the server to.
2. FAUNADB: The FaunaDB api key.

## Documentation
### `GET` / Web Interface
Here you will find the web based view of the database contents.

### `GET` /get-users Get all users
This route will return all users in the database

### `GET` /get-user/:id Get user by id
This route will return the object of the user with the provided id.

### `POST` /create-user Create user
This route recieves a JSON object with the user to create. It will return the created user. The JSON object takes the following form:

```js
{
	name: 'name',
	lastname: 'lastname',
	birthDate: 'DD/MM/YYY',
	img: 'profile picture url'
}
```

### `DELETE` /delete-user/:id Delete user
This method will delete the user with the id provided.
