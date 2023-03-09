const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const chatbot = require('./src/routes/chatRoute');
const saveData =require('./src/routes/graphApi');
const save = require('./src/routes/graphApi');
const app = express();
app.use(bodyParser.json());
app.use(cors())


 app.use("/chat",chatbot);


app.use('/savechat',saveData);


// app.use('/savedata', save)

const port = 5555;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});