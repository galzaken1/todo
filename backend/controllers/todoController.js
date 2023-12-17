import Todo from '../models/todoModel.js'
import User from '../models/userModel.js';

export const newTodo = async (req, res) => {
    const { userId, todo } = req.body;
    console.log(userId, todo)
    let newT;
    try {
        newT = await Todo.create({
            user: userId,
            todo: todo,
            isCompleted: false
        })
        const user = await User.findById(userId);
        user.todos.push(newT)
        await user.save();

        res.status(201).json({ todo: newT })
    } catch (e) {
        console.log(e);
    }
}
export const fetchTodos = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    try {
        const todos = await Todo.find({ user: userId })
        if (todos) {
            res.status(200).json({ todos: todos })
        } else {
            res.status(404).json({ message: 'Not avaliable todos' });
        }
    } catch (e) {
        res.send({ message: 'error' })
    }
}
export const updateToDo = async (req, res) => {
    const todoId = req.body.todoId;
    const todo = await Todo.findById(todoId);
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: todoId },
            { $set: { isCompleted: !todo.isCompleted } }, // Set to true or your desired value
            { new: true }
        );
        res.status(200).json({ todo: updatedTodo });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const deleteToDo = async (req, res) => {
    const id = req.params.id;
    console.log('sdss')
    try {
        const deleteTodo = await Todo.findOneAndDelete({
            _id: id
        })
        res.status(204).send();
    } catch (e) {
        console.log(e);
    }
}
export const todoList = async (req, res) => {
    const todos = await Todo.find();
    res.status(200).send({ todos: todos });
}