import React from 'react'
import ReactDOM from 'react-dom/client'

import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChannelPage } from './routes/ChannelPage'
import { ChannelPicker } from './routes/ChannelPicker'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChannelPicker />
  },
  {
    path: '/:channelPage',
    element: <ChannelPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
