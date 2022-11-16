import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ExpoloreGames from './pages/ExpoloreGames';
import SingleGameStats from './pages/SingleGameStats';


function App() {



  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ExpoloreGames />} />
        <Route path='/details/:symbol' element={<SingleGameStats />} />
      </Routes>
    
    </BrowserRouter>
   
  );
}

export default App;
