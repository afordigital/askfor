import { client } from 'mtmi'

function App() {
  client.connect({ channels: ['afor_digital'] })

  client.on('message', ({ username, channel, message }) => {
    console.log(`${channel} [${username}]: ${message}`)
  })
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#050505]">
      <p>Suscríbete</p>
    </div>
  )
}

export default App
