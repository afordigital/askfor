import React, { FC, PropsWithChildren } from 'react'
import { Star } from '../components/Star'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative max-w-4xl mx-auto gap-12 text-[#191919] w-screen max-h-screen">
      <article className="flex flex-col my-10 h-full justify-center items-center gap-8">
        <div className="relative">
          <h1
            className="text-[100px] relative z-5 cursor-pointer"
            onClick={() => {
              window.location.href = '/'
            }}
          >
            ASKFOR
          </h1>

          <div className="flex gap-4 absolute top-8 -right-40 z-0 justify-center items-center">
            <Star />
            <img src="/star.png" alt="funny-star-image" />
          </div>
        </div>
        {children}
      </article>
    </div>
  )
}
