import { NavLink } from 'react-router-dom';
import '../styles/navigation.css';
import { BookOpen, ChartLine, FolderOpen } from "lucide-react";

function Navigation() {

    return (
        <nav className='navigation'>
            <NavLink to="/" className={({ isActive }) => `option ${isActive ? 'active' : ''}`}>
                <BookOpen size={22} />
                Nauka
            </NavLink>
            <NavLink to="/stats" className={({ isActive }) => `option ${isActive ? 'active' : ''}`}>
                <ChartLine size={22} />
                Statystyki
            </NavLink>
            <NavLink to="/words" className={({ isActive }) => `option ${isActive ? 'active' : ''}`}>
                <FolderOpen size={22} />
                Słówka
            </NavLink>
        </nav>
    );
}
export default Navigation;
