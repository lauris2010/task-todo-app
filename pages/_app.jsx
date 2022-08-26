import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';

import Layout from '../components/Layout';

import '@fortawesome/fontawesome-svg-core/styles.css';
import initFontAwesome from '../utils/initFontAwesome';
import '../styles/globals.css';

import { Toaster } from 'react-hot-toast'
import { ChakraProvider } from '@chakra-ui/react'

initFontAwesome();

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
        <Layout>
          <Toaster position="top-right"/>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
        </Layout>
    </UserProvider>
  );
}
