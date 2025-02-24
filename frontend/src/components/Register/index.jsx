import { useState } from "react"
import axios from "axios"
import styles from "./Register.module.css"


function Register(){
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (event)=>{
        event.preventDefault({onRegister})
        try {
            // Fazendo requisição para o endpoint de registro
            const response = await axios.post("http://localhost:3000/analiseDeProjetos/auth/register", {name,email, password})

            onRegister(response.data)
        } catch (err) {
            setError("Erro de registro, tente novamente.", err)
        }
    }


    return(
        <div>
            <h1>Registro</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(event)=> setName(event.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange = {(event)=> setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange ={(event)=> setPassword(event.target.value)}
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}

export default Register