
const {TodoModel} = require('./../schema/Todo')


async function storeTodo(req, res){
    let body = req.body;
    try{
        if(body.due && body.task && (body.completed != undefined)){
            const todo = new TodoModel({
                task: body.task,
                due: body.due,
                completed: body.completed
            })
            let data = await todo.save();
            res.status(201).json({message: 'Todo added successfully', data });
        }else{
            res.status(400).json({message: 'Please input valid details'});
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({message: 'Failed to process request'});
    }
}

async function editTodo(req, res){
    let body = req.body;
    console.log(typeof body);

    try{
        if(req.params.id && body.task && body.due && (body.completed != undefined)){
            await TodoModel.updateOne({_id: req.params.id}, {$set: {task: body.task, due: body.due, completed: body.completed}});
            res.status(201).json({message: 'Todo updated successfully'});
        }else{
            res.status(400).json({message: 'Id parameter missing in request'});
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({message: 'Failed to process request'});
    }
}

async function removeTodo(req, res){
    // let body = JSON.parse(req.body);
    console.log(req.params);
    try{
        if(req.params.id){
            await TodoModel.deleteOne({_id:req.params.id});
            res.status(201).json({message: 'Todo removed successfully'});
        }else{
            res.status(400).json({message: 'Id parameter missing in request'});
        }
    }
    catch(e){
        res.status(500).json({message: 'Failed to process request'});
    }
}

async function fetchTodos(req, res){
    try{
        let todos = [];
        todos = await TodoModel.find({}).exec();
        res.status(200).json({data: todos});
    }
    catch(e){
        console.log(e);
        res.status(500).json({message: 'Failed to process request'});
    }
}

async function getTodo(req, res){
    try{
        let todo = await TodoModel.find({_id:req.params.id}).exec();
        res.status(200).json({data: todo});
    }
    catch(e){
        console.log(e);
        res.status(500).json({message: 'Failed to process request'});
    }
}


module.exports = {
    storeTodo,editTodo,removeTodo,fetchTodos,getTodo
}