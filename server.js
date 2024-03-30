
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const {storeTodo,editTodo,removeTodo,fetchTodos, getTodo} = require('./src/controller/TodoController');

const {loadConnection} = require('./src/connection');
loadConnection();

var cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
app.post('/todo', storeTodo);
app.put('/todo/:id/edit', editTodo);
app.delete('/todo/:id', removeTodo);
app.get('/todos', fetchTodos);
app.get('/todo/:id', getTodo);

const port = 3100;
app.listen(port,()=>{
    console.log("App is running at. " + port);
});