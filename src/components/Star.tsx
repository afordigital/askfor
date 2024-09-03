import { useEffect, useState } from 'react'

export const Star = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: MouseEvent) => {
    setCursorPosition({ x: event.clientX, y: event.clientY })
  }

  // Efecto para agregar y limpiar el evento global de movimiento del ratón
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  interface CursorPosition {
    x: number
    y: number
  }

  const calculateRelativePosition = (rect: DOMRect): CursorPosition => {
    const x = cursorPosition.x - rect.left // Posición X relativa al span padre
    const y = cursorPosition.y - rect.top // Posición Y relativa al span padre

    // Limitar la posición para que el span hijo blanco no salga del span negro
    const limitedX = Math.min(Math.max(x - 8, 0), 32 - 16) // 8 es la mitad del span blanco (16 / 2)
    const limitedY = Math.min(Math.max(y - 8, 0), 32 - 16)

    return { x: limitedX, y: limitedY }
  }

  return (
    <div className="absolute flex gap-2">
      <span
        className="w-[32px] h-[32px] relative rounded-full bg-black"
        ref={(element) => {
          if (element) {
            const spanElement = element as HTMLSpanElement
            const rect = spanElement.getBoundingClientRect()
            const position = calculateRelativePosition(rect)

            const firstChild = spanElement.children[0] as HTMLElement
            firstChild.style.left = `${position.x}px`
            firstChild.style.top = `${position.y}px`
          }
        }}
      >
        {/* Span hijo blanco que sigue el cursor dentro del span padre */}
        <span
          className="w-[16px] h-[16px] rounded-full bg-white"
          style={{ position: 'absolute' }}
        ></span>
      </span>

      {/* Segundo span padre negro */}
      <span
        className="w-[32px] h-[32px] relative rounded-full bg-black"
        ref={(element) => {
          if (element) {
            const spanElement = element as HTMLSpanElement
            const rect = spanElement.getBoundingClientRect()
            const position = calculateRelativePosition(rect)

            const firstChild = spanElement.children[0] as HTMLElement
            firstChild.style.left = `${position.x}px`
            firstChild.style.top = `${position.y}px`
          }
        }}
      >
        {/* Span hijo blanco que sigue el cursor dentro del segundo span padre */}
        <span
          className="w-[16px] h-[16px] rounded-full bg-white"
          style={{ position: 'absolute' }}
        ></span>
      </span>
    </div>
  )
}
