require('dotenv').config()
const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoutes'); 
const userRouter = require('./routes/userRoutes');

mongoose.connect(process.env.MONGO_URI,).then(
    ()=>console.log('DB connection successfull!')
)
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter) //mounting routes in express
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{   
    res.send("API running...")
})
app.listen(process.env.PORT,()=>console.log(`server running on http://localhost:${process.env.PORT}`))