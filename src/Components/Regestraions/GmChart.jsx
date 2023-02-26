import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
  import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
  import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { homedata } from '../../Store/HomeData/HomeData';
import { useContext } from 'react';
import { useLayoutEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

  

export default function GmChart() {

    let {t} = useTranslation()

  let {loader , gmData , gmDatas , from,to } = useContext(homedata)


  var today = new Date();
  var yyyy = today.getFullYear();

  useLayoutEffect(() => {
    gmData(from , to , 3)
  }, [])

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
  );
  
   const options = {
    responsive: true,
    plugins: {
        legend: {
          display: false
        },
      },
      scales:{
        x: {
            grid: {
              display: false
            },
            beginAtZero: false,
            ticks: {
              color: "black",
            }
          },
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
            ticks: {
              color: "black",
            }
          }
        ,
      },
      maintainAspectRatio: false ,
      
  };


  
  const labels = [ t('January'), t('February'), t('March'), t('April'), t('May'), t('June'), t('July') , t('Aug') , t('Sept') , t('Oct') , t('Nov') , t('Dec')];



   const data = 

   {
    labels,
    datasets: 
    gmDatas != null ? 
    [
      {
        fill: true,
        label:gmDatas.type,
        data: [gmDatas.chart.January , gmDatas.chart.February , gmDatas.chart.March  ,gmDatas.chart.April  , gmDatas.chart.May  , gmDatas.chart.June  , gmDatas.chart.July  , gmDatas.chart.August  , gmDatas.chart.September  , gmDatas.chart.October , gmDatas.chart.November  ,gmDatas.chart.December ],
        borderColor: '#45C0BE',
        backgroundColor: 'rgb(69, 192, 190)',
        borderRadius: Number.MAX_VALUE,
      },
    ] : '',
   };



  return (
    <div>
        <Card sx={{padding : '10px' ,height : '500px'}}>
        <h2 style={{color : '#45C0BE'}}>{t('manger')}</h2>
            <div className='d-flex align-items-center justify-content-center h-75 mt-3'>
          {     
                gmDatas != null ? <Bar options={options} data={data} width="100%" height="100%" /> : loader == true ? <CircularProgress color='inherit'/>  : 'Error Happend'
          } 
          </div>
         
        </Card>

    </div>
  )
}
