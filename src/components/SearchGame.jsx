import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/context'
import {BsSearch} from 'react-icons/bs'
import gamePopularity from '../api/gamePopularity'

export default function SearchGame() {
  
  const [text,setText] = useState("")
  const {addGame} = useGlobalContext()
  
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(text.length > 0){
        // game add logic
        let formatedText = text.charAt(0).toUpperCase() + text.slice(1)
        const game = await gamePopularity.get("game",{
          params:{name:formatedText, year: "2020", month: '12'},
      
        })
        //console.log(game?.data)
        // if name is incorrect it will not crash
        if(game?.data?.length === 0){
          window.alert("Provide correct name")
        }else{
          //console.log(game)
          //console.log("executed")
          addGame(formatedText)
          setText('')
          

        }
      
    }else{
      window.alert("Provide game name")

    }
    
  }
  
  
  return (
    <div className='searchForm_wrapper'>
      <form onSubmit={handleSubmit} className="searchGame_form">
        <input type="text" placeholder="Game Name"
         value={text} onChange={(e)=> setText(e.target.value)} className={`searchGame_input`}/>
         <button type='submit' className="searchGame_btn"><BsSearch className='btn_icon' /></button>
        </form>
    </div>
  )
}
