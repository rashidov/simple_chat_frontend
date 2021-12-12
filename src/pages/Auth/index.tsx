import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import socket from '../../socket'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import MainLayout from '../../layouts/MainLayout'
import { Context } from '../../context'
import { SET_IS_AUTH, SET_ROOM_ID, SET_USER_NAME } from '../../types'
import './style.scss'

const Authorizations: React.FC = () => {
  const [roomName, setRoomName] = React.useState<string>('')
  const [login, setLogin] = React.useState<string>('')
  const {dispatch} = React.useContext(Context)
  const navigate = useNavigate()

  const submitHandler = async() => {
    if (roomName.length < 3 || login.length < 3) return;

    const response: AxiosResponse = await axios.post('/rooms', { roomId: roomName })
    if (response.status !== 200) return alert('Произошла ошибка со стороны сервера!')
    socket.emit('ROOM:JOIN', {roomId: roomName, userName: login})
    dispatch!({type: SET_ROOM_ID, payload: roomName})
    dispatch!({type: SET_USER_NAME, payload: login})
    dispatch!({type: SET_IS_AUTH, payload: true})
    navigate('/rooms')
  }

  return (
    <MainLayout>
      <div className="authorizations">
        <div className="authorizations__header">
          Simple Chat
        </div>
        <div className="authorizations__container">
          <Input 
            value={roomName}
            placeholder='название комнаты'
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Input 
            value={login}
            placeholder='логин'
            onChange={(e) => setLogin(e.target.value)} 
          />
          <Button 
            text='Войти' 
            onClick={submitHandler}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Authorizations
