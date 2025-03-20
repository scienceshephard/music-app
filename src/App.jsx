import { Route, Routes } from 'react-router-dom'
import './App.css' 
import Home from './pages/Home'
import Discover from './pages/discover/Discover'
import Favourite from './pages/favourite/favourite'
function App() {
  
  return (
    <Routes >
        <Route path='/'element={<Home />}>
          <Route  path='/discover' element={<Discover />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/favourite' element={<Favourite />} />
        </Route>
      </Routes>
  )}

export default App