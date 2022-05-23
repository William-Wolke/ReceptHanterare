import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>

            <div className='navbarNamn'>
                <h1>Receptsida</h1>
            </div>

            <div className='navbarLinksContainer'>

                <NavLink to="/" className='navbarLinks'>Hem</NavLink>

                <NavLink to="/allaRecept" className='navbarLinks'>Recept</NavLink>

                <NavLink to="/skapaRecept" className='navbarLinks'>Skapa Recept</NavLink>

                <NavLink to="/skapaIngrediens" className='navbarLinks'>Skapa Ingrediens</NavLink>

                <NavLink to="/veckoMenyer" className='navbarLinks'>Veckomenyer</NavLink>

                <NavLink to="/skapaVeckomeny" className='navbarLinks'>Skapa Veckomeny</NavLink>
           
            </div>
            
        </div>
    );
} 

export default Navbar;