import axios from "axios";



export default axios.create({
    baseURL: "https://twitch-game-popularity.p.rapidapi.com/",
    headers:{
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
    }
})

