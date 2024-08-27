type ModalProps = { isOpen: boolean; close: () => void; clearAll: () => void }

export const Modal = ({ isOpen, close, clearAll }: ModalProps) => {
  return (
    isOpen && (
      <dialog
        id="customDialog"
        className="fixed inset-0 flex justify-center items-center p-12 border-4 border-black"
      >
        <div className="bg-white flex flex-col gap-8 ">
          <p className="text-2xl">
            ¿Estás seguro/a de que quieres vaciar todas las preguntas?
          </p>
          <div className="flex justify-center gap-8">
            <button
              style={{ boxShadow: '4px 4px 0 black' }}
              onClick={close}
              className="bg-[#fde194] transition-colors transition-duration-300 ease-in-out hover:bg-[#f7d986] px-8 font-semibold text-2xl py-2 border-black border-4"
            >
              Cancelar
            </button>
            <button
              style={{ boxShadow: '4px 4px 0 black' }}
              onClick={() => {
                close()
                clearAll()
              }}
              className="bg-[#fa5858] hover:bg-[#fb5353] transition-colors transition-duration-300 ease-in-out px-8 font-semibold text-2xl py-2 border-black border-4"
            >
              Eliminar
            </button>
          </div>
        </div>
      </dialog>
    )
  )
}