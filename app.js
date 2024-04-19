import express, { application } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js'
import jobRouter from './routes/jobRouter.js'
import applicationRouter from './routes/applicationRouter.js'
import {dbConnection} from './database/dbConnection.js'
import { errorMiddleware } from './middlewares/error.js';
const app=express()
dotenv.config({path:'./config/config.env'})

app.use(cors({
    // origin:[process.env.FRONTEND_URL],
    origin:"http://localhost:5173",
    methods:['GET','POST','DELETE','PUT'],
    credentials:true,
}))


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}))


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });


app.use('/api/v1/user',userRouter)
app.use('/api/v1/application',applicationRouter)
app.use('/api/v1/job',jobRouter)
dbConnection();

app.use(errorMiddleware)

export default app;