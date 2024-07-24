require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spaceRoutes = require("./routes/spaceRoutes");
const cardRoutes = require("./routes/cardRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

const PORT = 3000;


const allowedOrigins = ['https://fivespaces.netlify.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', cardRoutes);
app.use('/api', spaceRoutes);

app.get('/api', (req, res) => {
    res.send('API is running...');
});






app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
});