const express = require("express"); 
const userRouter = require("./routes/userRoutes.js")
const cors = require('cors')


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api", userRouter)

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});