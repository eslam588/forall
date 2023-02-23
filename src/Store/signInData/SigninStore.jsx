import { number } from "joi"
import React, { createContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import axios from "../Links/Urls"




export let siginInStore = createContext()



export function SignStore({children}){

    let mailRegex = /(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    const [loader, setLoader] = useState(false);
    const [singleUser, setSingleUser] = useState(null);
    const [rember, setrember] = useState(false);




    // get ip address

    function myip(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://api.ipify.org/", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    }
    let navigate = useNavigate()

// login function

    const handleSubmit = (event) => {
        setLoader(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(mailRegex.test(data.get('email')) == false){
         toast.error('Kindly Enter A Valid Email Address')
         setLoader(false)
        }else{
          if(!data.get('email') == true || !data.get('password') == true){
            toast.error('Kindly Enter The Required Infotrmation')
            setLoader(false)
          }else{
            axios.post('/auth/api/login' , {
              email : data.get('email') , 
              password :data.get('password')
          }).then(response =>{
          if(response.data.data.type.id == 3){
            setLoader(false)
            if(rember == true){
              localStorage.setItem('token' , response.data.data.token)
              if(response.data.data.company_branch !=null){
                localStorage.setItem('id' , response.data.data.company_branch.company.id)
              }else{
                localStorage.setItem('id' , response.data.data.company.id)
              }
              localStorage.setItem('Userid' , response.data.data.id)
              localStorage.setItem('Name' , response.data.data.name)
              localStorage.setItem('Language' , response.data.data.language.symbols)
            }else{
              sessionStorage.setItem('token' , response.data.data.token)
              if(response.data.data.company_branch !=null){
                sessionStorage.setItem('id' , response.data.data.company_branch.company.id)
              }else{
                sessionStorage.setItem('id' , response.data.data.company.id)
              }
              sessionStorage.setItem('Userid' , response.data.data.id)
              sessionStorage.setItem('Name' , response.data.data.name)
              sessionStorage.setItem('Language' , response.data.data.language.symbols)
              localStorage.setItem('Language' , response.data.data.language.symbols)
            }
            navigate('/home/dashboard')
          }else{
            toast.error('you do not have a permission to login')
            setLoader(false)
          }
         
          } ).catch(err =>{
            console.log(err)
              setLoader(false)
              if(err.response.status == 401){
                  toast.error("incorrect Email or Password")
              }else if(err.response.status == 422){
                toast.error("incorrect Email or Password")
              }else{
                toast.error("we have an updates try later on")
              }
          } )
          }
        }
       
      };

 //logout function

 
  async function logout(){
    setLoader(true)
    let res = await axios.get('/auth/api/logout',{
        headers : {
            Authorization :localStorage.getItem('token') == null ?  `Bearer  ${sessionStorage.getItem('token')}` : `Bearer  ${localStorage.getItem('token')}`
        }
    }).then(response => {
        localStorage.clear()
        sessionStorage.clear()
        navigate('/')
        setLoader(false)

    }).catch(err=>{
      if(err.response.status == 401){
        localStorage.clear()
        sessionStorage.clear()
        navigate('/')
        toast.error('Kindly Log In Again')
    }
    })
  }

  // search user 

  async function searchByUser(e){
    if(!e == false){
      let res = await axios.get(`/operation/users?id=${e}`,{
        headers : {
            Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
            lang : localStorage.getItem('Language')
        }
    }).then(response => {
      setSingleUser(response.data)
    }).catch(err=>{
      if(err.response.status == 401){
        localStorage.clear()
        sessionStorage.clear()
        navigate('/')
        toast.error('Kindly Log In Again')
    }
    })
    }else{
       setSingleUser(null)
    }
  }
    
    return(
        <siginInStore.Provider value={{handleSubmit , loader , logout , searchByUser , singleUser , setSingleUser , setrember}}>
            {children}
        </siginInStore.Provider>
    )

}

