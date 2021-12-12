import { SET_IS_AUTH, SET_MESSAGES, SET_NEW_MESSAGE, SET_ROOM_ID, SET_USERS, SET_USER_NAME } from "./types";

export interface Action {
  type: string,
  payload?: any
}

export interface State {
  isAuth: boolean
  users: string[]
  userName: string
  roomId: string
  messages: Message[]
}

export interface Message {
  from: string
  text: string
}

export interface Dispatch {
  state: State
  action: Action
}

// eslint-disable-next-line import/no-anonymous-default-export
export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_IS_AUTH: 
      return {...state, isAuth: action.payload}

    case SET_ROOM_ID: 
      return {...state, roomId: action.payload}
    
    case SET_USERS:
      return {...state, users: action.payload}

    case SET_USER_NAME:
      return {...state, userName: action.payload}

    case SET_MESSAGES: 
      return {...state, messages: action.payload}
    
    case SET_NEW_MESSAGE: 
      return {...state, messages: [...[action.payload], ...state.messages]}

    default: return state;
  }
}