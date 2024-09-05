import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatPage from './chat-page'

import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WelcomePage from './welcome-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />
  },
  { path: '/:channel', element: <ChatPage /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />

  // </React.StrictMode>,
)
