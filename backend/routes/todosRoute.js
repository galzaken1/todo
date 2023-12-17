import express from 'express';
import { newTodo, fetchTodos, updateToDo, deleteToDo, todoList } from '../controllers/todoController.js';
const router = express.Router();


router.post('/newtodo', newTodo);
router.get('/fetchtodos/:userId', fetchTodos)
router.patch('/completed', updateToDo);
router.delete('/deletetodo/:id', deleteToDo);
router.get('/gettodos', todoList);


export default router;