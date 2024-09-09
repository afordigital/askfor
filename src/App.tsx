import '@fontsource/abril-fatface'
import '@fontsource-variable/outfit'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { Channel } from './pages/channel'
import { Layout } from './pages/layout'

function App() {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/:channel" Component={Channel} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
