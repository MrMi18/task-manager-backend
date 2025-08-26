import express from 'express'
import cors from 'cors'
import userRouter from './routers/userRoutes.js';
import projectRouter from './routers/projectRoutes.js';
import taskRoutes from './routers/taskRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use('/' , userRouter);
app.use('/' , projectRouter);
app.use('/',taskRoutes)


app.listen (process.env.PORT , () => {
    console.log(`server is listing to port ${process.env.PORT}`)
})