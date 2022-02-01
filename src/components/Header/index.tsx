import './header.css';
import logo from '../../assets/images/shopping-bag-svgrepo-com.svg';

const Header = () => {
    return (
        <header>
            <img className='img-logo' src={logo} alt="company logo img" />
            <p className='logo-name'>Dev<span>Market</span></p>
        </header>
    )
}

export default Header;