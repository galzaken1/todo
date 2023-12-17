import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    user: { // creating a reference to the user who created the todo
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isCompleted: {
        type: Boolean,
        default: false
    }

}, { timestamp: true })

const Todo = mongoose.model('Todo', todoSchema);
export default Todo