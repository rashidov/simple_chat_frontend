import React from 'react'
import './MainLayout.scss'

const MainLayout: React.FC = ({children}) => {
  return (
    <div className='mainLayout'>
      {children}
    </div>
  )
}

export default MainLayout
