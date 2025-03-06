import styles from "./Header.module.css"
import logoAti from "../../assets/logoAti.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Header = ({user, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  }
  
  return (
    <header className={styles.containerHeader}>
      <img src={logoAti} alt="" />
      {user && (
        <div className={styles.userSection}>
          <button 
            onClick={handleLogout}
            className={styles.logoutButton}
            title="sair"
          > 
            
            <FontAwesomeIcon icon={faSignOutAlt} size="lg"/>
          </button>
        </div>
      )}
    </header>
  )
}

export default Header