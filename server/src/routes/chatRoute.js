const express = require("express");
const router = express.Router();
const fs=require('fs');
// const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.CHATBOT_KEY,
  });
  const openai = new OpenAIApi(configuration);

function savefile(req){
  const chatdata=require('../../chat.json')
  let chat =`${req.body.prompt}`;
     chatdata.push(chat);
     fs.writeFile("./chat.json", JSON.stringify(chatdata,null,2), err => {
     // Checking for errors   
     if (err) throw err;
      console.log("Done writing"); // Success  });      
})
}



router.post("/", async (req, res) => {

  
    const { prompt } = req.body;

    try {
      if (prompt == "") {
        throw new Error("no prompt was provided");
      }
  const completion = await openai.createCompletion({
      model: "text-davinci-003", 
      
        prompt: `pretent you are manager who provide leave to employess and ask for the following details one by one\n
        \n\ntype of leave,
       
        \n\n duration of leave,
       
      \n\n purpose of leave,\n
       
      \n\n date from which the leave is applicable,\n
       
       \n\n date till the leave needed,\n
  
        \n\n person: ${prompt} \n`,
          temperature: 0.2,
          max_tokens: 250,
          top_p: 1,
        frequency_penalty: 0,
        //  presence_penalty: 0,
          n:1,
          stop: '\n\n\n',
        });

    res.send(completion.data.choices[0].text.trim());
// console.log(completion.data.choices[0].text.trim());
  }catch (error) {
    console.log(error.message);
  }
  savefile(req)
  });

  
  module.exports = router;