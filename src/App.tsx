import { client } from 'mtmi'
import UserMessage from './components/viewerMessage'

function App() {
  client.connect({ channels: ['afor_digital'] })

  client.on('message', ({ username, channel, message }) => {
    console.log(`${channel} [${username}]: ${message}`)
  })
  return (
    <div className="bg-[#ffd787]">
      <div className="max-w-[1016px] mx-auto gap-12 text-black w-screen h-screen flex flex-col justify-center items-center">
        <p className='text-7xl'>ASKFOR</p>
        <UserMessage message='Hola esto es una pregunta bla bla bla' />
        <UserMessage message='Hola esto es una pregunta bla bla bla' />
        <UserMessage message='Hola esto es una pregunta bla bla bla' />
      </div>
    </div>
  )
}

export default App
