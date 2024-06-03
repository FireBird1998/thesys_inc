import PeopleSideBar from '@/components/Others/PeopleSideBar'
import KanbanBoard from '@/components/kanbanBoardItems/KanbanBoard'
import React from 'react'

const page = () => {
  return (
    <div className='z-10 flex w-full'>
      <div className='flex items-center justify-between w-full'>
        <KanbanBoard  />
      </div>
      {/* <div>
        <PeopleSideBar />
      </div> */}
    </div>

  )
}

export default page