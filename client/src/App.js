import Chat from './component/chat.js';
import { PageLayout } from './component/pageLayout.js'
import { AuthenticatedTemplate, UnauthenticatedTemplate,useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { loginRequest } from "./config.ts";
import { ProfileData } from "./component/profileData";
import { callMsGraph } from "./graph";
import './App.css';
export  let AccessToken;

function App() {
   
  function ProfileContent() {
  
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    const name = accounts[0] && accounts[0].name;
    
    function RequestProfileData() {

        
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {

            AccessToken = response.accessToken
            console.log("AccessToken to export:",AccessToken);
            
            callMsGraph(response.accessToken).then(response => setGraphData(response));
            console.log(graphData)
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            }
        </>
    );
};


  return (
    <PageLayout>
      <AuthenticatedTemplate>
      {/* <ProfileContent /> */}
      <Chat/>
   </AuthenticatedTemplate>
   <UnauthenticatedTemplate>
                <p>You are not signed in! Please sign in.</p>
            </UnauthenticatedTemplate>
   </PageLayout>
  );
}
export default App;

