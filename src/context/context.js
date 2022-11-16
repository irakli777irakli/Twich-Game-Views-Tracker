import React,{useState, useEffect, useContext} from 'react'

const AppContext = React.createContext()

const AppProvider = ({children})=>{
    const [selectedGame, setSelectedGame] = useState(
        localStorage.getItem("gamesList")?.split(",") ||["Paladins","Clash Royale"]
        )


    useEffect(()=>{
        localStorage.setItem("gamesList", selectedGame)
    },[selectedGame])


    const addGame = (gameName) =>{
        if (selectedGame.indexOf(gameName) === -1){
        setSelectedGame([...selectedGame,gameName])
        }
    }

    const deleteGame = (gameName) =>{
        console.log(gameName)
        setSelectedGame(selectedGame.filter((game)=> game !== gameName))
    }

    return <AppContext.Provider value={{selectedGame,setSelectedGame, addGame, deleteGame}}>
        {children}
    </AppContext.Provider>

}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext,AppProvider}
