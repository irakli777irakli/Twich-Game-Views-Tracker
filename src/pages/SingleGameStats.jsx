import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import gamePopularity from '../api/gamePopularity'
import GameChart from '../components/GameChart'
import {useNavigate} from 'react-router-dom'



export default function SingleGameStats() {
  const {symbol} = useParams()
  
  const [chartData,setChardData] = useState()
  const [year,setYear] = useState(["2019","2020","2021"])
  // link between button and year respectivelly
  const [index,setIndex] = useState(2)
  const navigate = useNavigate()

  const navigateHome = () =>{
    navigate("/")
  }

  
  const formatData = (data) =>{
      const singleMonth = data.map((monthly)=>{
       
        return {
          x:  (parseInt(monthly.month[0] === "0" ? monthly.month.slice(1) : monthly.month ) * 2629743) * 1000, 
          y: monthly.hrWatched
        }
      })
      //console.log(singleMonth)
      return singleMonth
  }

  useEffect(()=>{
    const fetchData = async () =>{
      const responses = await Promise.all(year?.map((el)=>{
        return gamePopularity.get("game",{
          params:{name: symbol, year: el, month: "12"},
       
        })
      }));

      //console.log(responses)

      const singleMonthStats = responses?.map((response)=>{
        return response.data.map((month)=>{
          return {month: month.Month, year: month.Year, hrWatched:month.Hours_watched}; 
        })
      })

      console.log(singleMonthStats)

      setChardData({
        twenty_nineteen: formatData(singleMonthStats[0]),
        twenty_twenty: formatData(singleMonthStats[1]),
        twenty_twentyone: formatData(singleMonthStats[2])
      })
    }
    fetchData()


  },[symbol,year])

  
  const SelectedButton = (i) =>{
    if(i === index){
      return "active"
    }
  }

  return (
    <section className='detailsPage'>
      
      {chartData && <GameChart symbol={symbol} chartData={chartData} index={index}/>}
      {chartData && <div className='btn_wrapper'>
        <button onClick={() => setIndex(0)} className={SelectedButton(0)} >2019</button>
        <button onClick={() => setIndex(1)} className={SelectedButton(1)} >2020</button>
        <button onClick={() => setIndex(2)} className={SelectedButton(2)} >2021</button>
        <button onClick={() => navigateHome()}>Home</button>
      </div>}
    </section>
  )
}
