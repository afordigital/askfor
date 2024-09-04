import { useState } from 'react'

type ModalProps = {
  isOpen: boolean
  close: () => void
  applyChannel: (newChanel: string) => void
}

export const NewchanelModal = ({
  isOpen,

  close,
  applyChannel
}: ModalProps) => {
  const [newChannel, setNewChannel] = useState('')
  return (
    <>
      {isOpen && <div className="fixed z-10 inset-0 bg-black/50"></div>}
      <dialog
        open={isOpen}
        className="fixed z-10 left-1/2 top-1/2 right-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
      >
        <div className="bg-white p-12 flex flex-col gap-6 border-4 border-black">
          <label className="flex flex-col items-center gap-3">
            <p className="text-2xl text-center">
              Digite el nombre del nuevo canal
            </p>
            <input
              type="text"
              value={newChannel}
              placeholder='Ejemplo: "afor_digital"'
              className="border-2 border-black px-4 py-2"
              onChange={(e) => setNewChannel(e.target.value)}
            />
          </label>
          <div className="flex justify-center gap-8">
            <button
              style={{ boxShadow: '4px 4px 0 black' }}
              onClick={() => {
                close()
                applyChannel(newChannel)
              }}
              className="bg-[#99EDC5] hover:bg-[#8edeb7] transition-colors transition-duration-300 ease-in-out px-8 font-semibold text-2xl py-2 border-black border-4"
            >
              Aplicar
            </button>
            <button
              style={{ boxShadow: '4px 4px 0 black' }}
              onClick={close}
              className="bg-[#fde194] transition-colors transition-duration-300 ease-in-out hover:bg-[#f7d986] px-8 font-semibold text-2xl py-2 border-black border-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
