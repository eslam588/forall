import React, { createContext, useEffect, useState,useContext } from "react"
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "../Links/Urls"
import {homedata} from '../../Store/HomeData/HomeData'
import dayjs from 'dayjs';




export let contractors = createContext()

export function ContractorsData({children}){

    const [loader, setLoader] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [vendors, setVenodrs] = useState(null);
    const [contractView, setContractView] = useState(null);
    const [joiningDate, setJoiningDate] = useState(null);
    const [from, setFrom] = useState('2020-01-01');
    const [to, setTo] = useState(`${dayjs().$y}-${dayjs().$M+1 != 11 || dayjs().$M+1 != 12 ? 0 : ''}${dayjs().$M+1}-${dayjs().$D}`);
    let {t} = useTranslation()

    let navigate = useNavigate()

    async function allContractors(id,from,to){
       setVenodrs(null)
       setLoader(true)
       let res = await axios.get(`/operation/sales/vendor/pagination?id=${id}&from=${from}&to=${to}&page=1`,{
        headers :{
            Authorization :localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
            lang : localStorage.getItem('Language')
        }
    }).then(res=>{
        if(res.status == 200){
            setLoader(false)
            setVenodrs(res.data)
        }
    }).catch(err =>
        {
            setLoader(false)
            if(err.response.status != 201 && err.response.status == 500){
                setLoader(false)
                console.log("errrrrrrrrrrrrrror");
                setErrorData(t('updates'))
            }else if(err.response.status == 401){
                localStorage.clear()
                sessionStorage.clear()
                navigate('/')
                toast.error('Kindly Log In Again')
            }
           }
    )
    }

    // async function nextContractors(e){
    //     setVenodrs(null)
    //     setLoader(true)
    //    let res = await axios.get(`${e}` , {
    //     headers :{
    //         Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
    //         lang : localStorage.getItem('Language')
    //     }
    // }).then(res=>{
    //     if(res.status == 200){
    //         setLoader(false)
    //         setVenodrs(res.data)

    //     }
    // }).catch(err =>{
    //     setLoader(false)
    //     if(err.response.status == 401){
    //         localStorage.clear()
    //         sessionStorage.clear()
    //         navigate('/')
    //         toast.error('Kindly Log In Again')
    //     }
    // })
    // }

    async function contractorsPaginations(id,from,to,pageNum){
        setVenodrs(null)
        setLoader(true)
       let res = await axios.get(`/operation/sales/vendor/pagination?id=${id}&from=${from}&to=${to}&page=${pageNum}` , {
        headers :{
            Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
            lang : localStorage.getItem('Language')
        }
    }).then(res=>{
        if(res.status == 200){
            setLoader(false)
            setVenodrs(res.data)

        }
    }).catch(err =>{
        setLoader(false)
        if(err.response.status == 401){
            localStorage.clear()
            sessionStorage.clear()
            navigate('/')
            toast.error('Kindly Log In Again')
        }
    })
    }



    async function singleContract(e){
        setLoader(true)
        let res = await axios.get(`/operation/sales/vendor/pagination?id=${localStorage.getItem('id') == null ? sessionStorage.getItem('id') :  localStorage.getItem('id')}&vendor_id=${e}`,{
            headers :{
                Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
                lang : localStorage.getItem('Language')
            }
        }).then(res =>{
            if(res.status == 200){
                setJoiningDate(new Date(res.data.data.created_at))
                setContractView(res.data)
                setLoader(false)
            }
        }).catch(err=>{
            setLoader(false)
            if(err.response.status != 201 && err.response.status == 500){
                setLoader(false)
                console.log(err)
                setErrorData(t('updates'))
            }else if(err.response.status == 401){
                localStorage.clear()
                sessionStorage.clear()
                navigate('/')
                toast.error('Kindly Log In Again')
            }
           })
    }
      return(
        <contractors.Provider value={{loader,vendors,allContractors,singleContract,contractView,setContractView,joiningDate,errorData,from,to,setFrom,setTo,contractorsPaginations}}>
            {children}
        </contractors.Provider>
    )

}

