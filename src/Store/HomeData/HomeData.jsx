import { number } from "joi"
import React, { createContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import axios from "../Links/Urls"
import dayjs from 'dayjs';

export let homedata = createContext()


export function HomeAllData({children}){


  var today = new Date();
  var yyyy = today.getFullYear();


    const [loader, setLoader] = useState(false);
    const [sales, setSales] = useState(null);
    const [gmDatas, setgmDatas] = useState(null);
    const [mmDatas, setMmDatas] = useState(null);
    const [spvDatas, setSpvDatas] = useState(null);
    const [tlDatas, setTlDatas] = useState(null);
    const [salesDatas, setSalesDatas] = useState(null);
    const [vendorDatas, setVendorDatas] = useState(null);
    const [salesAgent, setSalesAgents] = useState(null);
    const [from, setFrom] = useState('2020-01-01');
    const [to, setTo] = useState(`${dayjs().$y}-${dayjs().$M+1 != 11 || dayjs().$M+1 != 12 ? 0 : ''}${dayjs().$M+1}-${dayjs().$D}`);

 let navigate = useNavigate()

    async function salesData(e , i , y){
        setLoader(true)
        setSales(null)
      let res = await axios.get(`/operation/sales/chart?id=${e}&from=${i}&to=${y}`,{
        headers : {
            Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
            lang : localStorage.getItem('Language')
        }
      }).then(response=>{
        if(response.status == 200){
          console.log(response.data.data);
          setSales(response.data.data)
          setLoader(false)
        }
      }).catch(err=>{
        setLoader(false)
        if(err.response.status == 401){
          localStorage.clear()
          sessionStorage.clear()
          navigate('/')
          toast.error('Kindly Log In Again')
      }
      })
    }

    async function agentsData(e , i , y){
      setLoader(true)
      setSalesAgents(null)
    let res = await axios.get(`/operation/sales/count_users?from=${e}&to=${i}&type_id=${y}`,{
      headers : {
          Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
          lang : localStorage.getItem('Language')
      }
    }).then(response=>{
      if(response.status == 200){
        setSalesAgents(response.data.data)
        setLoader(false)
      }
    }).catch(err=>{
      setLoader(false)
      if(err.response.status == 401){
        localStorage.clear()
        sessionStorage.clear()
        navigate('/')
        toast.error('Kindly Log In Again')
    }
    })
  }

  async function gmData(e , i , y){
    setLoader(true)
    setgmDatas(null)
  let res = await axios.get(`/operation/sales/count_users?from=${e}&to=${i}&type_id=${y}`,{
    headers : {
        Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
        lang : localStorage.getItem('Language')
    }
  }).then(response=>{
    if(response.status == 200){
      setgmDatas(response.data.data)
      setLoader(false)
    }
  }).catch(err=>{
    setLoader(false)
    if(err.response.status == 401){
      localStorage.clear()
      sessionStorage.clear()
      navigate('/')
      toast.error('Kindly Log In Again')
  }
  })
}

async function MMData(e , i , y){
  setLoader(true)
  setMmDatas(null)
let res = await axios.get(`/operation/sales/count_users?from=${e}&to=${i}&type_id=${y}`,{
  headers : {
      Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
      lang : localStorage.getItem('Language')
  }
}).then(response=>{
  if(response.status == 200){
    setMmDatas(response.data.data)
    setLoader(false)
  }
}).catch(err=>{
  setLoader(false)
  if(err.response.status == 401){
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
    toast.error('Kindly Log In Again')
}
})
}

async function spvData(e , i , y){
  setLoader(true)
  setSpvDatas(null)
let res = await axios.get(`/operation/sales/count_users?from=${e}&to=${i}&type_id=${y}`,{
  headers : {
      Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
      lang : localStorage.getItem('Language')
  }
}).then(response=>{
  if(response.status == 200){
    setSpvDatas(response.data.data)
    setLoader(false)
  }
}).catch(err=>{
  setLoader(false)
  if(err.response.status == 401){
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
    toast.error('Kindly Log In Again')
}
})
}
async function tlData(e , i , y){
  setLoader(true)
  setTlDatas(null)
let res = await axios.get(`/operation/sales/count_users?from=${e}&to=${i}&type_id=${y}`,{
  headers : {
      Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
      lang : localStorage.getItem('Language')
  }
}).then(response=>{
  if(response.status == 200){
    setTlDatas(response.data.data)
    setLoader(false)
  }
}).catch(err=>{
  setLoader(false)
  if(err.response.status == 401){
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
    toast.error('Kindly Log In Again')
}
})
}

async function salesagentsData(e , i , y){
  setLoader(true)
  setSalesDatas(null)
let res = await axios.get(`/operation/sales/count_users?from=${e}&to=${i}&type_id=${y}`,{
  headers : {
      Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
      lang : localStorage.getItem('Language')
  }
}).then(response=>{
  if(response.status == 200){
    setSalesDatas(response.data.data)
    setLoader(false)
  }
}).catch(err=>{
  setLoader(false)
  if(err.response.status == 401){
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
    toast.error('Kindly Log In Again')
}
})
}

async function vendorData(e , i , y){
  setLoader(true)
  setVendorDatas(null)
let res = await axios.get(`/operation/sales/count_users?from=${e}&to=${i}&type_id=${y}`,{
  headers : {
      Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
      lang : localStorage.getItem('Language')
  }
}).then(response=>{
  if(response.status == 200){
    setVendorDatas(response.data.data)
    setLoader(false)
  }
}).catch(err=>{
  setLoader(false)
  if(err.response.status == 401){
    localStorage.clear()
    sessionStorage.clear()
    navigate('/')
    toast.error('Kindly Log In Again')
}
})
}


      return(
        <homedata.Provider value={{from, setFrom ,to, setTo ,vendorDatas ,vendorData , salesagentsData , salesDatas ,tlData , tlDatas ,spvData , spvDatas ,salesData , loader , sales , agentsData , salesAgent , gmData , gmDatas , mmDatas , MMData}}>
            {children}
        </homedata.Provider>
    )

}

