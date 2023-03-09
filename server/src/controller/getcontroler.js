const save =async(req,res)=>{
  const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const Site_Id='0dcfb1ab-e654-4ddb-a833-6047bcd0a437'
const Leaverequest_Id='6a70731a-dfb9-42f5-9b37-e21ac21dd7af';

    console.log(req.headers.authorization,'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy')
const {token} = req.params;
  console.log(token,'llll');
  if(!token ){
 
    return res.status(404).json({
        success: false,
        error: "No Token found"
    });
  }
  else{
    const response=
   await  axios.get(`${BASE_PATH}/${Site_Id}/lists/${Leaverequest_Id}/items?$expand=fields`, 
{ headers:
 {
 'Authorization': `Bearer ${token} `,
  'Content-Type': 'application/json'
  }
    
  })
  console.log(response.data.value,"meetingssssssssssssssssssssssss" )
  const rev = response.data.value
  var ydata = [...rev].reverse();

  res.status(200).json({
    success: true,
    response :ydata,
    // response1:responseTop.data.value


 });
  
}}
  module.exports =save