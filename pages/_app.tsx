import React from 'react';
import Layout from '../components/Layout'
import type { AppProps } from 'next/app';
import '../styles/css/globals.css';
import '../styles/css/style.css';
import '../styles/css/theme.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}