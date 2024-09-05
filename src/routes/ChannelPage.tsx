import { client } from 'mtmi'
import { useEffect, useState } from 'react'
import { Question } from '../Types'
import { Modal } from '../components/Modal'
import { ActionButtons } from '../components/ActionButtons'
import { QuestionsLayout } from '../components/QuestionsLayout'
import { redirect, useParams } from 'react-router-dom'
import { Star } from '../components/Star'

export const ChannelPage = () => {
  const { channelPage: channelName } = useParams()
  const lsName = `questionsStorage-${channelName}`
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem(lsName)
    return saved !== null ? JSON.parse(saved) : []
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState<'DEFAULT' | 'ANSWERED'>('DEFAULT')
  // const [newChannelModal, setNewChannelModal] = useState(
  //   channelName ? false : true
  // )

  useEffect(() => {
    localStorage.setItem(lsName, JSON.stringify(questions))
  }, [questions, lsName])

  useEffect(() => {
    client.connect({ channels: [channelName ?? ''] })

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

        const badgesImages = badges
          .filter((badge) => badge.image)
          .map((b) => b.image)

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
                  badges: badgesImages,
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
    redirect(`/${channelName}`)
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
      <div className="fixed bottom-4 left-4">
        <p className="text-[#dcf4ff]">{channelName}</p>
      </div>
      {/* <div className="fixed bottom-4 right-4">
        <MoreVertical
          onClick={() => {
            setNewChannelModal(true)
          }}
        />
      </div> */}

      <Modal
        isOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false)
        }}
        clearAll={clearAll}
      />
      <article className="flex pb-40 flex-col my-10 h-full justify-center items-center gap-8">
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

{
  /* <NewchanelModal
  isOpen={newChannelModal}
  close={() => {
    setNewChannelModal(false)
  }}
  applyChannel={(newChannel: string) => {
    // setChannel(newChannel)
    console.log(newChannel)
    setNewChannelModal(false)
    clearAll()
    redirect(`/${newChannel}`)
  }}
/> */
}
