import type { AppProps } from 'next/app';
import '../styles/css/globals.css';
import '../styles/css/style.css';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}
