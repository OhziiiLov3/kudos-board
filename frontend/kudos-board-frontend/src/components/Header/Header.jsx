import "../Header/Header.css"
import logo from '../../assets/images/logo.png'

const Header = () => {
  return (
    <header className="banner">
        <img src={logo} alt="" />
    </header>
  )
}

export default Header