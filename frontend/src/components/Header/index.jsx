import styles from "./Header.module.css"
import logoAti from "../../assets/logoAti.png"

const Header = () => {
  return (
    <header className={styles.containerHeader}>
      <img src={logoAti} alt="" />
    </header>
  )
}

export default Header