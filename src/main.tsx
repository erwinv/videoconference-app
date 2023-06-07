import { CssBaseline, CssVarsProvider } from '@mui/joy'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { initializeCompatApp as initializeFirebase } from '~/firebase'
import router from '~/router'
import theme from '~/theme'

initializeFirebase()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="system" theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>
)
