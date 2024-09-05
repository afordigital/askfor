import { Question } from '../types'

type ActionButtonProps = {
  swipeMode: () => void
  openModal: () => void
  mode: 'DEFAULT' | 'ANSWERED'
  questions: Question[]
}

export const ActionButtons = ({
  questions,
  swipeMode,
  openModal,
  mode
}: ActionButtonProps) => {
  return (
    <div className="flex relative z-5 gap-8">
      <div className="relative">
        <span className="absolute bg-[#FF8A8A] hover:bg-[#fe8282] -top-4 -right-3 h-[36px] w-[36px] transition-colors transition-duration-300 ease-in-out flex items-center justify-center p-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="font-semibold text-xl">
            {mode === 'DEFAULT'
              ? questions.filter((q) => q.answered).length
              : questions.filter((q) => !q.answered).length}
          </span>
        </span>

        <button
          style={{ boxShadow: '4px 4px 0 black' }}
          onClick={swipeMode}
          className="bg-[#F1D3FF] transition-colors transition-duration-300 ease-in-out hover:bg-[#eabefe] px-12 font-semibold text-2xl py-4 border-black border-4"
        >
          {mode === 'DEFAULT' ? 'Ya contestadas' : 'Por contestar'}
        </button>
      </div>
      <button
        style={{ boxShadow: '4px 4px 0 black' }}
        onClick={openModal}
        className="bg-[#FFB4B4] hover:bg-[#fda1a1] transition-colors transition-duration-300 ease-in-out px-12 font-semibold text-2xl py-4 border-black border-4"
      >
        Vaciar
      </button>
    </div>
  )
}
