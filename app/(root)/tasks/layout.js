import TaskBoardTopBar from '@/components/navigation/TaskBoardTopBar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <TaskBoardTopBar />
        {children}
    </div>
  )
}

export default layout