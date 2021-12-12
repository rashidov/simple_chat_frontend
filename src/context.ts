import React from 'react'
import { Action, State } from './reducer'

interface ContextProps {
  state?: State
  dispatch?: (action: Action) => any
}

export const Context = React.createContext<ContextProps>({})