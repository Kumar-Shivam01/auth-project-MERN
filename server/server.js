require('dotenv').config()
const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoutes'); 
const userRouter = require('./routes/userRoutes');
const cors = require('cors')
const app = express();
   
const allowedOrigins = ['http://localhost:5173']
app.use(express.json());
app.use(cookieParser());    
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.use('/api/auth',authRouter) //mounting routes in express
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{   
    res.send("API running...")
})
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('Database connection successful!');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`),
    );
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
