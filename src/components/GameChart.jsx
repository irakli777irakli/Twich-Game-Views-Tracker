import React from 'react'
import Chart from 'react-apexcharts'


export default function GameChart({symbol,chartData,index}) {


    
const determineData = (index) =>{
    switch (index){
        case 0:
            return chartData?.twenty_nineteen

        case 1:
            return chartData?.twenty_twenty
           
        case 2:
            return chartData?.twenty_twentyone
            
        default: 
            return chartData?.twenty_twentyone
    }
}

    //(parseInt(determineData(index)[0]?.y) - parseInt(determineData(index)[2]?.y)) > 0 ? ["green"] : ["red"]
  const options = {
    colors: (parseInt(determineData(index)[0]?.y) - parseInt(determineData(index)[determineData(index).length - 1]?.y)) < 0 ? ["green"] : ["red"],
    title: {
        text: symbol,
        align: "center",
        style: {
            fontSize: "24px"
        }
    },
    chart: {
        id: "view stats",
        animation:{
            speed: 1300,
        }
    },
    xaxis:{
        type: "datetime",
        labels: {
            datetimeUTC: false
        }
    },
    tooltip:{
        x:{
            format: "MMM dd HH:MM"
        }
    }
}


const series = [{
  name: symbol,
  data: determineData(index),
}]




  return (
 <div className='chart_wrapper'>
    <Chart options={options} series={series} type="area" width="100%"/>
</div>
  )
}
