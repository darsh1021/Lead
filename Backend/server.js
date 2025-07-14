const express = require('express')
const app = express()
const cors = require('cors');
const connectDB  = require('./db');


app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json());

connectDB();

app.get('/',(req,res)=>{
  res.send("Hi form backend");
});

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/', userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});