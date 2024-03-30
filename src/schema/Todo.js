
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task:String,
    due:Date,
    completed:Boolean
});

const TodoModel = mongoose.model('Todo',TodoSchema);

exports.TodoModel = TodoModel;