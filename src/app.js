import express from 'express'

import cors from 'cors'

import userRouter from './routers/userRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use('/' , userRouter);



app.listen (process.env.PORT , () => {
    console.log(`server is listing to port ${process.env.PORT}`)
})