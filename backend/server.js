const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spaceRoutes = require("./routes/spaceRoutes");
const cardRoutes = require("./routes/cardRoutes");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


app.use('/api/', cardRoutes);
app.use('/api', spaceRoutes);




app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
});