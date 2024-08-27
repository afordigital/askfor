import { client } from 'mtmi'
import UserMessage from './components/viewerMessage'
import '@fontsource/abril-fatface'
import '@fontsource-variable/outfit'

import { useEffect, useState } from 'react'
import { ActionButtons } from './components/ActionButtons'
import { Modal } from './components/Modal'

export type Question = {
  user: string
  message: string
  answered: boolean
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState<'DEFAULT' | 'ANSWERED'>('DEFAULT')

  useEffect(() => {
    client.connect({ channels: ['afor_digital'] })

    client.on('message', ({ username, message }) => {
      console.log(`[${username}]: ${message}`)
      if (!message.toLowerCase().startsWith('!pregunta')) return
      if (message.length > 150) return
      const slicedMessage = message.slice(10)
      questions.filter((question) => {
        question.message === slicedMessage
      })
      setQuestions([
        ...questions,
        { user: username, message: slicedMessage, answered: false }
      ])
    })

    return () => {
      client.close('message')
    }
  }, [questions])

  const swipeMode = () => {
    if (mode === 'DEFAULT') {
      setMode('ANSWERED')
    } else {
      setMode('DEFAULT')
    }
  }

  const clearAll = () => {
    setQuestions([])
    setIsModalOpen(false)
  }

  return (
    <div className="relative max-w-4xl mx-auto gap-12 text-[#191919] w-screen max-h-screen">
      <Modal
        isOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false)
        }}
        clearAll={clearAll}
      />
      <article className="flex flex-col my-20 h-full justify-center items-center gap-8">
        <h1 className="text-[100px]">ASKFOR</h1>
        <ActionButtons
          swipeMode={swipeMode}
          openModal={() => {
            setIsModalOpen(true)
          }}
        />
        <div className="flex w-full px-4 flex-col gap-8">
          {questions.map((question) => {
            return (
              <UserMessage
                username={question.user}
                message={question.message}
              />
            )
          })}
        </div>
      </article>
    </div>
  )
}

export default App
