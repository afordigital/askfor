import { Star, Trash } from 'lucide-react'

const UserMessage = ({
  username,
  message
}: {
  username: string
  message: string
}) => {
  return (
    <section className="bg-[#fafafa] flex justify-between text-start text-2xl w-full px-10 py-8 border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-current rounded-2xl">
      <div className="flex flex-col w-full max-w-full">
        <span className="bg-[#befebe] border-black text-lg rounded-[100px] border-2 px-2 w-fit">
          {username}
        </span>
        <span className="break-all">{message}</span>
      </div>
      <div className="flex gap-2 items-center">
        <button className="bg-yellow p-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Star />
        </button>
        <button className="bg-red p-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Trash />
        </button>
      </div>
    </section>
  )
}

export default UserMessage
