import { Star, Trash } from 'lucide-react'
import { colord } from 'colord'

const UserMessage = ({
  id,
  username,
  message,
  color,
  answered,
  handleClick
}: {
  id: string
  username: string
  message: string
  color: string
  answered: boolean
  handleClick: (questionId: string) => void
}) => {
  const _color = colord(color === 'currentColor' ? '#7affa6' : color)

  const textColor = _color.isLight()
    ? _color.darken(0.75).toHex()
    : _color.lighten(0.75).toHex()

  return (
    <div
      onClick={() => {
        handleClick(id)
      }}
      className="bg-[#fafafa] flex justify-between text-start text-2xl w-full px-6 py-4 border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-current rounded-2xl"
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
          className="border-black text-lg rounded-[100px] border-2 px-2 w-fit"
        >
          {username}
        </span>
        <span className="break-all">{message}</span>
      </div>
      <div className="flex gap-2 items-center">
        <button className="bg-[#FBD26A] hover:bg-[#ffd364] transition-colors transition-duration-300 ease-in-out p-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Star />
        </button>
        <button className="bg-[#FF8A8A] hover:bg-[#fe8282] transition-colors transition-duration-300 ease-in-out p-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Trash />
        </button>
      </div>
    </div>
  )
}

export default UserMessage
