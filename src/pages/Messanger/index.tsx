import React from 'react'
import { Context } from '../../context'
import MainLayout from '../../layouts/MainLayout'
import { Message } from '../../reducer'
import { SET_NEW_MESSAGE } from '../../types'
import Content from './components/Content'
import Users from './components/Users'
import './style.scss'

const Messanger: React.FC = () => {
  const {state, dispatch} = React.useContext(Context)

  const addStoreMsg = ({from, text}: Message) => {
    dispatch!({type: SET_NEW_MESSAGE, payload: {from, text}})
  }

  return (
    <MainLayout>
      <div className='messanger'>
        <div className="messanger__container">
          <Users 
            userName={state?.userName ? state.userName : ''} 
            users={state?.users ? state.users : []} 
          />
          <Content 
            addStoreMsg={addStoreMsg}
            messages={state?.messages ? state?.messages : [] } 
            userName={state?.userName ? state.userName : ''} 
            roomId={state?.roomId ? state?.roomId : ''} 
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Messanger
