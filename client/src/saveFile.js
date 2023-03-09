import {useEffect} from 'react';
import { configuration } from "./App";
import { PublicClientApplication } from "@azure/msal-browser";
import { IPublicClientApplication } from "@azure/msal-browser";
export  let AccessToken;

export default function Save(){

    // const [token, setToken] = useState('');
    // const pca = new PublicClientApplication(configuration);
    const pca= PublicClientApplication()
    const accounts = pca.getAllAccounts();
    
    useEffect(() => {
      async function getAccessToken() {
        if (accounts.length > 0) {
          const request = {
            scopes: ['user.read'],
            account: accounts[0]
          }
          const accessToken = await pca.acquireTokenSilent(request).then((response) => {
           
            // setToken(response.accessToken);
              // console.log(token,'uuuuuu')
              AccessToken = response.accessToken
          }).catch(error => {
            // Do not fallback to interaction when running outside the context of MsalProvider. Interaction should always be done inside context.
            console.log(error);
            return null;
          });
  
            // AccessToken = token;
        }
  
        return null;
      }
      getAccessToken();
  
    }, [])
   
}