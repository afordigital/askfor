const UserMessage = ({ message }: { message: string }) => {
  return (
    <div className='bg-[#fafafa] flex justify-between text-start text-3xl w-full px-10 py-8 border-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,1)] border-current rounded-2xl'>
      <span>{message}</span>
      <div className='flex gap-4 items-center'>
        <button className='bg-yellow p-1 border-2 border-black rounded-md shadow-[2px_2px_2px_2px_rgba(0,0,0,1)]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="black" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14L2 9.27l6.91-1.01z" /></svg>
        </button>
        <button className='bg-red p-1 border-2 border-black rounded-md shadow-[2px_2px_2px_2px_rgba(0,0,0,1)]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6" /></svg>
        </button>
      </div>
    </div >

  )
}

export default UserMessage
