import { Question } from '../chat-page'
import UserMessage from './viewerMessage'

type QuestionsLayoutProps = {
  questions: Question[]
  mode: 'DEFAULT' | 'ANSWERED'
  onQuestionClick: (questionId: string) => void
  handleFavourite: (questionId: string) => void
}

export const QuestionsLayout = ({
  questions,
  mode,
  onQuestionClick,
  handleFavourite
}: QuestionsLayoutProps) => {
  return (
    <div className="flex relative z-5 w-full px-4 flex-col gap-6">
      {questions
        .filter((question) => {
          return mode === 'DEFAULT' ? !question.answered : question.answered
        })
        .sort((a, b) => b.likes - a.likes)
        .sort((a) => (a.favourite ? -1 : 1))
        .map((question) => {
          return (
            <UserMessage
              key={question.id}
              question={question}
              handleClick={onQuestionClick}
              handleFavourite={handleFavourite}
            />
          )
        })}
    </div>
  )
}
