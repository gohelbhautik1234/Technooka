import { useState, useEffect } from 'react'
import axios from 'axios';
function App() {

  const[users,setusers]=useState([]);
  const[searchtext,setsearchtext]=useState();
  const[filterusers,setfilterusers]=useState([]);
  
  async function getdata(){
    let data=await axios.get('https://dummyjson.com/users');
    setusers(data.data.users);
    setfilterusers(data.data.users)
    console.log(data.data.users);
  }

  function searchuelist(value)
  {
    let filterdata =users.filter((ele)=>ele.firstName.toLowerCase().includes(value));
    setfilterusers(filterdata);
  }

  useEffect(()=>{
    if(searchtext=='' || searchtext=='undefined')
    {
      setfilterusers(users)
    }
    else
    {
      searchuelist(searchtext);
    }
    
  },[searchtext])

  useEffect(()=>{
    getdata(); 
 },[])
  return (
    <>
    <div><input type="text" onChange={(e)=>setsearchtext(e.target.value)} /></div>
    <div>
    {
      filterusers.length>0 && filterusers.map((ele)=>(
        <div>{ele.firstName}</div>
      ))
    }
    </div>  
    </>
  )
}

export default App
