//Import order: imports from libraries, then imports for styles, then inner components, types, and functions.
import React from 'react'
import ReactDOM from 'react-dom'

import { ChakraProvider } from '@chakra-ui/react'
import 'animate.css'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
