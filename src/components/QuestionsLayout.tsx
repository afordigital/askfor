import { Question } from '../App'
import UserMessage from './viewerMessage'

type QuestionsLayoutProps = {
  questions: Question[]
  mode: 'DEFAULT' | 'ANSWERED'
  onQuestionClick: (questionId: string) => void
}

export const QuestionsLayout = ({
  questions,
  mode,
  onQuestionClick
}: QuestionsLayoutProps) => {
  return (
    <div className="flex relative z-5 w-full px-4 flex-col gap-6">
      {questions
        .filter((question) => {
          return mode === 'DEFAULT' ? !question.answered : question.answered
        })
        .sort((a) => (a.favorite ? 1 : -1))
        .map((question) => {
          return (
            <UserMessage
              key={question.id}
              id={question.id}
              username={question.user}
              message={question.message}
              color={question.userColor}
              answered={question.answered}
              handleClick={onQuestionClick}
            />
          )
        })}
    </div>
  )
}
