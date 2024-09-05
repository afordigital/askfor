import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ChannelPicker = () => {
  const [newChannel, setNewChannel] = useState('')
  const navigate = useNavigate()

  const saveChannel = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    localStorage.setItem('recentChannels', JSON.stringify(newChannel))
    console.log(newChannel)
    navigate(`/${newChannel}`)
  }

  console.log(newChannel)
  return (
    <dialog
      open
      className="fixed z-10 left-1/2 top-1/2 right-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
    >
      <div className="bg-white p-12 border-4 border-black">
        <form
          onSubmit={saveChannel}
          className="flex flex-col justify-center gap-6"
        >
          <label className="flex flex-col items-center gap-3">
            <p className="text-2xl text-center">
              Digite el nombre del nuevo canal
            </p>
          </label>
          <input
            type="text"
            value={newChannel}
            placeholder='Ejemplo: "afor_digital"'
            className="border-2 border-black px-4 py-2"
            onChange={(e) => setNewChannel(e.target.value)}
          />
          <div className="flex items-center justify-center gap-8">
            <button
              style={{ boxShadow: '4px 4px 0 black' }}
              onClick={close}
              className="bg-[#fde194] transition-colors transition-duration-300 ease-in-out hover:bg-[#f7d986] px-8 font-semibold text-2xl py-2 border-black border-4"
            >
              Cancelar
            </button>
            <button
              style={{ boxShadow: '4px 4px 0 black' }}
              className="bg-[#99EDC5] hover:bg-[#8edeb7] transition-colors transition-duration-300 ease-in-out px-8 font-semibold text-2xl py-2 border-black border-4"
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
