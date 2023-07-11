import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div className="navbar">
                <div className="navbarLinkContainer">
                    <NavLink to="/" className="navbarLink">
                        <h1 className="navbarHeader">Receptsida</h1>
                    </NavLink>

                    <NavLink to="/allaRecept" className="navbarLink">
                        <h2 className="navbarLinkText">Recept</h2>
                    </NavLink>

                    <NavLink to="/skapaRecept" className="navbarLink">
                        <h2 className="navbarLinkText">Skapa Recept</h2>
                    </NavLink>

                    <NavLink to="/skapaIngrediens" className="navbarLink">
                        <h2 className="navbarLinkText">Skapa Ingrediens</h2>
                    </NavLink>

                    <NavLink to="/veckoMenyer" className="navbarLink">
                        <h2 className="navbarLinkText">Veckomenyer</h2>
                    </NavLink>

                    <NavLink to="/skapaVeckomeny" className="navbarLink">
                        <h2 className="navbarLinkText">Skapa Veckomeny</h2>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
