import React, {useContext, useEffect, useState} from 'react'
import gamePopularity from '../api/gamePopularity'
import {useGlobalContext} from '../context/context'
import SearchGame from '../components/SearchGame'
import {useNavigate} from 'react-router-dom'




export default function ExpoloreGames() {
   
    const navigate = useNavigate();
    const {selectedGame,deleteGame} = useGlobalContext();
    const [games,setGames] = useState()
    
    const handelNavigate = (gameName) =>{
      navigate(`details/${gameName}`)
    }

   

    useEffect(()=>{

        const fetchData = async ()=>{

          const responses = await Promise.all(selectedGame?.map((game)=>{
            return gamePopularity.get("game",{
              params:{name: game, year: "2021", month: "12"}, // 12 max data
             
            })
          }))
          

         //console.log(responses)
          const data = responses.map((element)=>{
            // getting stats based on arr length -> arr.length represents amount of month 
            let mx = element.data.length - 1;
            return element.data[mx];
          })
          //console.log(data)
          
          setGames(data)
          
        }
        fetchData()
    },[selectedGame])
    
    

  return (
    <div className='expoleGames_page'>
      <SearchGame/>

      <table className='table'>
        <thead className='table_head'>
          <tr className='table_row'>
            <th>Rank</th>
            <th>Game</th>
            <th>Month</th>
            <th>Year</th>
            <th>Hours Watched</th>
          </tr>
        </thead>
        <tbody>
          {games?.map((game)=>{
            return <tr key={game.Game} className='table_row' onClick={() => handelNavigate(game.Game)} >
                
                <td>{game.Rank}</td>
                <td>{game.Game}</td>
                <td>{game.Month}</td>
                <td>{game.Year}</td>
                <td>{game.Hours_watched} <button className='del_btn' onClick={(e) => {e.stopPropagation(); deleteGame(game.Game)}}>remove</button></td>
                
                
            </tr>
          })}


        </tbody>
      </table>
      
    </div>
  )
}
