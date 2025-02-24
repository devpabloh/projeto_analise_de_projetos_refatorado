import {useState} from 'react'
import axios from 'axios'


function Login({onLogin}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")

    const handleLogin = async (event)=>{
        event.preventDefault()
        try {
            // faz a requisição para o endpoint de login
            const response = await axios.post("http://localhost:3000/auth/login",{email, password})

            // Armazena o token e os dados do usuário, por exemplo, no localStorage ou no estado global
            localStorage.setItem("token", response.data.token)

            // Se você receber o objeto usuário, pode armazená-lo também
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // // Callback para informar que o usuário está logado (por exemplo, redirecionar para dashboard)
            onLogin(response.data.user);
        } catch (err) {
            setError('Erro ao fazer login. Verifique suas credenciais.', err);
        }
    }

    return(
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login
