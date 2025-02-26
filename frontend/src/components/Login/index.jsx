import {useState} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types' 
import styles from './Login.module.css'
import logoAti from '../../assets/logoAti.png'
import { useNavigate } from 'react-router-dom'


function Login({onLogin}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogin = async (event)=>{
        event.preventDefault()
        try {
            // faz a requisição para o endpoint de login
            const response = await axios.post("http://localhost:3000/analiseDeProjetos/auth/login", {
                email,
                password
            })

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
        <div className={styles.containerGeral}>
            <div className={styles.containerImagem}>
                <img src={logoAti} alt="" />
            </div>
            <div className={styles.containerBackgroundLogin}>
                <div className={styles.containerLogin}>
                   
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <form className={styles.containerForm} onSubmit={handleLogin}>
                        <h2>Login</h2>
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
                        <div className={styles.buttonContainer}>
                            <button type="submit">Entrar</button>
                            <button 
                                type="button" 
                                onClick={handleRegister}
                                className={styles.registerButton}
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired
}


export default Login
