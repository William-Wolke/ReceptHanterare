import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="navbarContainer">
            <div className="navbar">
                <div className="navbarLinkContainer">
                    <Link href="/" className="navbarLink">
                        <h1 className="navbarHeader">Receptsida</h1>
                    </Link>

                    <Link href="/recipe" className="navbarLink">
                        <h2 className="navbarLinkText">Recept</h2>
                    </Link>

                    <Link href="/recipe/create" className="navbarLink">
                        <h2 className="navbarLinkText">Skapa Recept</h2>
                    </Link>

                    <Link href="/ingredient/create" className="navbarLink">
                        <h2 className="navbarLinkText">Skapa Ingrediens</h2>
                    </Link>

                    <Link href="/menu" className="navbarLink">
                        <h2 className="navbarLinkText">Veckomenyer</h2>
                    </Link>

                    <Link href="/menu/create" className="navbarLink">
                        <h2 className="navbarLinkText">Skapa Veckomeny</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
};
