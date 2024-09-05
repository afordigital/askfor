import { client } from 'mtmi'
import '@fontsource/abril-fatface'
import '@fontsource-variable/outfit'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Modal } from '../components/Modal'
import { ActionButtons } from '../components/ActionButtons'
import { QuestionsLayout } from '../components/QuestionsLayout'
import { ChevronLeft } from 'lucide-react'
import { Question } from '../types'
import { LSKeyByChannel } from '../utils'

export const Channel = () => {
  const params = useParams()
  const channelName = params.channel
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem(LSKeyByChannel(channelName))
    return saved !== null ? JSON.parse(saved) : []
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState<'DEFAULT' | 'ANSWERED'>('DEFAULT')

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

  useEffect(() => {
    localStorage.setItem(LSKeyByChannel(channelName), JSON.stringify(questions))
  }, [questions, channelName])

  useEffect(() => {
    if (!channelName) return

    client.connect({ channels: [channelName] })

    client.on(
      'message',
      ({ username, message, messageInfo, badges, userInfo, replyInfo }) => {
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

        setQuestions((questions) => {
          const existingQuestion = questions.find(
            (question) => question.id === messageInfo.id
          )

          return existingQuestion
            ? questions
            : [
                ...questions,
                {
                  id: messageInfo.id,
                  user: username,
                  message: slicedMessage,
                  answered: false,
                  favourite: false,
                  likes: 0,
                  badges: badges
                    .filter((badge) => badge.image)
                    .map((b) => b.image),
                  userColor:
                    userInfo.color === 'currentColor'
                      ? '#b8ff9e'
                      : userInfo.color
                }
              ]
        })
      }
    )
  }, [channelName])

  return (
    <>
      <div className="fixed top-4 left-4">
        <ChevronLeft
          color="black"
          size="32"
          className="cursor-pointer"
          onClick={() => {
            window.location.href = '/'
          }}
        />
      </div>
      <div className="fixed bottom-4 left-4">
        <p className="text-[#dcf4ff]">{channelName}</p>
      </div>

      <Modal
        isOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false)
        }}
        clearAll={clearAll}
      />

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
    </>
  )
}
