import '../index.css'
import { NavLink } from 'react-router-dom';
function NotFound() {
    return (
        <>
            <div className='wrapper'>
                <h1 className="website-title-box">404 - Strona nie znaleziona</h1>
                <NavLink to="/" className={({ isActive }) => `option ${isActive ? 'active' : ''}`}>
                    Strona Główna
                </NavLink>
            </div>
        </>
    );
}

export default NotFound;