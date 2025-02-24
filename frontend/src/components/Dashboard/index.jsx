function Dashboard({user, onLogout}){

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        onLogout()
    }
    return(
        <div>
            <h1>Dashboard</h1>
            <p>Bem vindo, {user.name}</p>

            {user.role === 'admin' ? (
                <p>Você é um administrador</p>
            ):(
                <p>Você é um usuário comum</p>
            )}
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default Dashboard