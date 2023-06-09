import { AppProps } from "next/app"

import "styles/globals.css"
import 'styles/styles.css'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeProvider options={{ initialColorMode: 'light', useSystemColorMode: true }} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
