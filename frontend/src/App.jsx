import './App.css';
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    setUser(null)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          !user ? (
            <div className='containerLogin'>
              <h1>Bem-vindo ao Sistema de Gestão de Projetos</h1>
              <Login onLogin={setUser} />
            </div>
          ) : (
            <Dashboard user={user} onLogout={handleLogout}/>
          )
        } />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App