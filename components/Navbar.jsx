import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="bg-[#84b082] flex flex-row gap-10 align-center h-20 pl-10">
            <Link href="/" className="my-auto">
                <h1 className="navbarHeader">Receptsida</h1>
            </Link>

            <Link href="/recipes" className="my-auto">
                <h2 className="text-lg">Recept</h2>
            </Link>

            <Link href="/menu" className="my-auto">
                <h2 className="text-lg">Veckomenyer</h2>
            </Link>
        </div>
    );
}
