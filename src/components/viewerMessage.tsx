import { Check, Heart, Star } from 'lucide-react'
import { colord } from 'colord'
import { Question } from '../Types'

const UserMessage = ({
  question,
  handleClick,
  handleFavourite
}: {
  question: Question
  handleClick: (questionId: string) => void
  handleFavourite: (questionId: string) => void
}) => {
  const {
    id,
    user: username,
    message,
    userColor: color,
    answered,
    favourite,
    likes,
    badges
  } = question
  const _color = colord(color === 'currentColor' ? '#7affa6' : color)

  console.log(badges)
  const textColor = _color.isLight()
    ? _color.darken(0.75).toHex()
    : _color.lighten(0.75).toHex()

  return (
    <div
      className={`${
        favourite ? 'bg-[#FFD37B]' : 'bg-[#fafafa]'
      } flex justify-between text-start text-2xl w-full px-6 py-4 border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-current rounded-2xl`}
    >
      <div className="flex flex-col w-full max-w-full">
        <span
          style={{
            background: answered
              ? 'grey'
              : color === 'currentColor'
              ? '#7affa6'
              : color,
            color: textColor
          }}
          className="border-black flex items-center gap-2 text-lg rounded-[100px] border-2 px-2 w-fit"
        >
          {badges.length > 0 && (
            <span className="flex gap-1">
              {badges.map((badge) => (
                <img src={badge} alt={badge} width={20} height={20} />
              ))}
            </span>
          )}
          {username}
        </span>
        <span className="break-all">{message}</span>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={(event) => {
            event.stopPropagation()
            handleFavourite(id)
          }}
          className="bg-[#FBD26A] hover:bg-[#ffd364] transition-colors transition-duration-300 ease-in-out p-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <Star className={`${favourite && 'fill-black'}`} />
        </button>
        <span className="relative bg-[#FF8A8A] hover:bg-[#fe8282] h-[36px] w-[36px] transition-colors transition-duration-300 ease-in-out flex items-center justify-center p-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Heart className={`${likes > 0 && 'fill-black'}`} />
          {likes > 0 && (
            <span className="absolute border-2 border-black -top-4 -right-3 bg-red-500 rounded-full w-[32px] text-center text-sm font-semibold">
              {likes < 9 ? likes : '+9'}
            </span>
          )}
        </span>
        <button
          onClick={() => {
            handleClick(id)
          }}
          className="bg-[#99EDC5] hover:bg-[#83ebb9] transition-colors transition-duration-300 ease-in-out p-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <Check />
        </button>
      </div>
    </div>
  )
}

export default UserMessage
