import { client } from 'mtmi'
import '@fontsource/abril-fatface'
import '@fontsource-variable/outfit'

import { useEffect, useState } from 'react'
import { ActionButtons } from './components/ActionButtons'
import { Modal } from './components/Modal'
import { Star } from './components/Star'
import { QuestionsLayout } from './components/QuestionsLayout'
import { MoreVertical } from 'lucide-react'
import { NewchanelModal } from './components/NewChannelModal'

export type Question = {
  id: string
  user: string
  message: string
  answered: boolean
  userColor: string
  favourite: boolean
  likes: number
}

function App() {
  const [channel, setChannel] = useState('afor_digital')
  const [newChannelModal, setNewChannelModal] = useState(false)
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
    client.connect({ channels: [channel] })

    client.on(
      'message',
      ({ username, message, messageInfo, userInfo, replyInfo }) => {
        if (message.length > 250) return

        if (replyInfo) {
          if (message.endsWith('+1')) {
            //@ts-expect-error error x
            addLike(replyInfo.parentMsgId)
          }
          return
        }

        if (!message.toLowerCase().startsWith('!p')) return

        const slicedMessage = message.slice(2).trim()

        if (!slicedMessage) return

        setQuestions((questions) => [
          ...questions,
          {
            id: messageInfo.id,
            user: username,
            message: slicedMessage,
            answered: false,
            favourite: false,
            likes: 0,
            userColor:
              userInfo.color === 'currentColor' ? '#b8ff9e' : userInfo.color
          }
        ])
      }
    )
  }, [channel])

  const addLike = (parentId: string) => {
    setQuestions((questions) =>
      questions.map((question) =>
        question.id === parentId
          ? { ...question, likes: question.likes + 1 }
          : question
      )
    )
  }

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

  const handleFavourite = (questionId: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? { ...question, favourite: !question.favourite }
          : question
      )
    )
  }

  return (
    <div className="relative max-w-4xl mx-auto gap-12 text-[#191919] w-screen max-h-screen">
      <div className="fixed bottom-4 right-4">
        <MoreVertical
          onClick={() => {
            setNewChannelModal(true)
          }}
        />
      </div>
      <NewchanelModal
        channel={channel}
        isOpen={newChannelModal}
        close={() => {
          setNewChannelModal(false)
        }}
        applyChannel={(newChannel: string) => {
          setChannel(newChannel)
          setNewChannelModal(false)
        }}
      />

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
          handleFavourite={handleFavourite}
        />
      </article>
    </div>
  )
}

export default App
