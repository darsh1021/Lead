const express = require('express')
const app = express()
const cors = require('cors');
const connectDB  = require('./db');


app.use(cors({ origin: 'https://lead-6569-darshas-projects-feb79bd7.vercel.app'}
));
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