import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_KEY } from '../utils'

export const Home = () => {
  const navigate = useNavigate()
  const [newChannel, setNewChannel] = React.useState('')

  const channels = Object.keys(localStorage)
    .filter((key) => key.includes(LOCAL_STORAGE_KEY))
    .map((key) => key.replace(LOCAL_STORAGE_KEY + '-', ''))

  return (
    <div className="bg-white p-10 pb-7 flex flex-col gap-6 border-4 border-black mt-5">
      <label className="flex flex-col items-center gap-3">
        <p className="text-2xl text-center">Digite el nombre del nuevo canal</p>
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
            navigate(`/${newChannel}`)
          }}
          className="bg-[#99EDC5] hover:bg-[#8edeb7] transition-colors transition-duration-300 ease-in-out px-8 font-semibold text-2xl py-2 border-black border-4"
        >
          Ir
        </button>
      </div>
      <div>
        {channels.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-center">O elige uno de los anteriores</p>
            <div className="flex flex-col gap-2">
              {channels.map((channel) => (
                <button
                  key={channel}
                  onClick={() => {
                    navigate(`/${channel}`)
                  }}
                  className="bg-[#fde194] hover:bg-[#f7d986] transition-colors transition-duration-300 ease-in-out px-8 font-semibold text-2xl py-2 border-black border-4"
                >
                  {channel}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
