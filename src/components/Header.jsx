import '../styles/headerStyles.css';
import chefIcon from '../assets/chef-icon.png';

export const Header = () => {
    return (
        <header>
            <img src={chefIcon} alt="Chef Icon" />
            <h1>Yes Chef!</h1>
        </header>
    );
};
