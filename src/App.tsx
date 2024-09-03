import { client } from 'mtmi'
import '@fontsource/abril-fatface'
import '@fontsource-variable/outfit'

import { useEffect, useState } from 'react'
import { ActionButtons } from './components/ActionButtons'
import { Modal } from './components/Modal'
import { Star } from './components/Star'
import { QuestionsLayout } from './components/QuestionsLayout'

export type Question = {
  id: string
  user: string
  message: string
  answered: boolean
  userColor: string
  favorite: boolean
}

function App() {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('questionsStorage')
    return saved !== null ? JSON.parse(saved) : []
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState<'DEFAULT' | 'ANSWERED'>('DEFAULT')

  useEffect(() => {
    localStorage.setItem('questionsStorage', JSON.stringify(questions))
  }, [questions])

  useEffect(() => {
    client.connect({ channels: ['afor_digital'] })

    client.on('message', ({ username, message, userInfo }) => {
      if (!message.toLowerCase().startsWith('!p')) return
      if (message.length > 250) return
      const slicedMessage = message.slice(2).trim()

      if (!slicedMessage) return

      setQuestions((questions) => [
        ...questions,
        {
          id: crypto.randomUUID(),
          user: username,
          message: slicedMessage,
          answered: false,
          favorite: false,
          userColor:
            userInfo.color === 'currentColor' ? '#b8ff9e' : userInfo.color
        }
      ])
    })
  }, [])

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

  const markAsRead = (questionId: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId ? { ...question, answered: true } : question
      )
    )
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
      <article className="flex flex-col my-10 h-full justify-center items-center gap-8">
        <div className="relative">
          <h1 className="text-[100px] relative z-5">ASKFOR</h1>

          <div className="flex gap-4 absolute top-8 -right-40 z-0 justify-center items-center">
            <Star />
            <img src="/star.png" alt="funny-star-image" />
          </div>
        </div>
        <ActionButtons
          mode={mode}
          swipeMode={swipeMode}
          openModal={() => {
            setIsModalOpen(true)
          }}
        />
        <QuestionsLayout
          questions={questions}
          mode={mode}
          onQuestionClick={markAsRead}
        />
      </article>
    </div>
  )
}

export default App
