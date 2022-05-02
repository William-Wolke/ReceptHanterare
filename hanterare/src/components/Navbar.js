import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbarNamn navbarBlock'>
                <h1>Receptsida</h1>
            </div>
            <div className='navbarLinksContainer navbarBlock'>
                <NavLink to="/" className='navbarLinks'>hem</NavLink>
                <NavLink to="/allaRecept" className='navbarLinks'>Recept</NavLink>
                <NavLink to="/skapaRecept" className='navbarLinks'>Skapa Recept</NavLink>
                <NavLink to="/skapaIngrediens" className='navbarLinks'>Skapa Ingrediens</NavLink>
                <NavLink to="/veckomeny" className='navbarLinks'>Veckomeny</NavLink>
            </div>
        </div>
    );
} 

export default Navbar;