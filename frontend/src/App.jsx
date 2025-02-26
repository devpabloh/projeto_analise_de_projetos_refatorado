import './App.css';
import { useEffect, useState } from "react"
import { BrowserRouter } from 'react-router-dom'  // Add this import
import Login from "./components/Login"
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null)

  const handleLogout =()=>{
    setUser(null)
  }

  useEffect(()=>{
    // verifica se o usuario esta logado, através dos dados armazenados no localStorage
    const storedUser = localStorage.getItem("user")
    // Se o usuario estiver logado, armazena os dados no estado
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[])

  return (
    <BrowserRouter>
      {!user ? (
        <div className='containerLogin'>
          <h1>Bem-vindo ao Sistema de Gestão de Projetos</h1>
          <Login onLogin={setUser} />
        </div>
      ) : (
        <Dashboard user={user} onLogout={handleLogout}/>
      )}
    </BrowserRouter>
  )
}

export default App