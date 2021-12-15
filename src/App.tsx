import React from 'react'
import Routes from './routes'
import socket from './socket'
import {reducer} from './reducer'
import { Context } from './context'
import { useNavigate } from 'react-router-dom'
import { SET_IS_AUTH, SET_MESSAGES, SET_NEW_MESSAGE, SET_USERS } from './types'
import './styles/main.scss'

const initState = {
  isAuth: false,
  users: [],
  userName: '',
  roomId: '',
  messages: []
}

const App: React.FC = () => {
  const navigate = useNavigate()
  const [state, dispatch] = React.useReducer(reducer, initState)

  React.useEffect(() => {
    if (!state.isAuth) navigate('/')
  }, [state.isAuth])

  React.useEffect(() => {
    navigate('/')

    socket.on('connect', () => {
      socket.on('ROOM:JOINED', data => dispatch({type: SET_USERS, payload: data}))
      socket.on('ROOM:NEW_MESSAGE', ({userName, text}) => dispatch({type: SET_NEW_MESSAGE, payload: {from: userName, text}}))
      socket.on('ROOM:MESSAGES', messages => dispatch({type: SET_MESSAGES, payload: messages}))
      socket.on('disconnect', () => dispatch({type: SET_IS_AUTH, payload: false}))
    })
  }, [])
 
  return (
    <Context.Provider value={{state, dispatch}}>
      <div className="App">
        <Routes />
      </div>
    </Context.Provider>
  )
}

export default App;
