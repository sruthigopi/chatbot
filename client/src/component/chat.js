import React from 'react';
import {useState} from 'react';
import CGLogo from '../assets/chatGPT.png';
import AppLogo from '../assets/app-logo.png';
// import { Form } from "antd";
import {useGetChatQuery,useAddChatMutation, useSaveChatMutation,useGetChatdataQuery} from '../services/chatApi';
import './chat.css'
// import axios from "axios";
// import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'

// import { ProfileContent } from './tokenAcess';

 function Chat(){
  // const [chatForm] = Form.useForm();
        const [prompt, setPrompt] = useState('');
        const [response, setResponse] = useState('');
        const [loading, setLoading] = useState(false);

        // post request to server from rtk query
         const [addChat] =useAddChatMutation();
        //  post request to sharepoint
        const [saveChat ]=useSaveChatMutation()


        //  file upload
  //       const [file, setFile] = useState()
  //     function handleChange(event) {

  //     setFile(event.target.files[0])
  // }
// submit button
        const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
console.log('submit button clicked');
        // calling function to for post request
           addChat({prompt})
           .unwrap()
           .then((res) => {

           
               setResponse(res.data);
               setLoading(false);
               console.log(res)
             })
           .catch((error) => {
            setResponse(error.data);
               setLoading(false);
             console.log(error)

           })
 
           const handleSave =(e)=>{
            // e.preventDefault();
            console.log('save button clicked');
            // get data
  //           const {data} = useGetChatdataQuery
  // console.log(data)
  
  
            saveChat({
              "Title":"title1",
              "EmployeeName":"sruthi",
              "LeaveType":"sick leave"
            })
            .then((res)=>{
              console.log('saved successfully');
              console.log(res)
            })
            .catch((err)=>{
              console.log('error while saving data');
              console.log(err);
            })
          }
          handleSave()
            // form submit
          //   const url = 'http://localhost:5555/uploadFile';
          //  const formData = new FormData();
          //  formData.append('file', file);
          //  formData.append('fileName', file.name);
          //  const config = {
          //    headers: {
          //      'content-type': 'multipart/form-data',
          //    },
          //  };
          //  axios.post(url, formData, config).then((response) => {
          //   console.log(response.data);
          // });
        }
        // save data to sharepoint
        
      return (
        <div className="wrapper">
{/* new */}
{/* <div className="chat-box"> */}
        {/* <div className="chat-box-header">chatbox</div> */}
        {/* <div class="chat-box-body">
            <div class="response">
                <p>Welcome, how can I help you?</p>
              </div>

              <p className="response-area">
        {loading ? 'loading...' : response}
         </p> */}
            {/* <!-- chat message --> */}
        {/* </div>
        <div class="chat-box-footer">
        <form onSubmit={handleSubmit}>
            <input  type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="type message here ...."/>
            <button>send</button>
            </form> */}
        {/* </div>
    </div> */}

       {/* output */}
      <img src={AppLogo} alt="" className="app-logo" />	
      <p>Welcome, how can I help you?</p>
      <p className="response-area">
        {loading ? 'loading...' : response}
         </p>

      {/* input */}
      <form onSubmit={handleSubmit}>
          <img src={CGLogo} alt="" className={loading ? 'cg-logo loading' : 'cg-logo'} />
        <input
        
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="type message here ...."
          
        />
        {/* <input type="file" className='fiesub' onChange={handleChange}/> */}
        {/* <FontAwesomeIcon icon={faFolderPlus} onClick={handleChange} className="font"></FontAwesomeIcon> */}
        <button type="submit">send</button>
      
      </form>
      {/* <form  onSubmit={handleSave}>
      <button type="submit" > savedata </button>
      </form> */}


</div>
      );
    }
  export default Chat;