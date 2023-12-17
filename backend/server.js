import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors'
import router from './routes/usersRoute.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import todosRouter from './routes/todosRoute.js'
dotenv.config() // loads env file
const PORT = process.env.PORT || 5001;// returns object that contains the user env enviorment;
const app = express(); // creates an express application
connectDB();
app.use(bodyParser.json()); // parsing json 
app.use(bodyParser.urlencoded({ extended: true })); // when true, using qs library

app.use(cors())// using it because server and frontend running on diff
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send('Winter is coming...')

})
app.use('/api/users', router)
app.use('/api/todos', todosRouter)
app.listen(PORT, () => { // a node server is returned
    console.log('Server is running on port' + PORT)
})