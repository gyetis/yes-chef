import '../styles/headerStyles.css';
import chefIcon from '../assets/chef-icon.png';

export const Header = () => {
    return (
        <header>
            <img src={chefIcon} alt="Chef Icon" />
            <h2>Yes Chef!</h2>
        </header>
    );
};
