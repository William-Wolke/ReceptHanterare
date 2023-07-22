import { Html, Head, Main, NextScript } from 'next/document'
import RootLayout from '../components/Layout';

export default function Document() {
    return (
        <Html lang="sv">
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <RootLayout>
                <Main />
                <NextScript />
            </RootLayout>
        </Html>
    )
}