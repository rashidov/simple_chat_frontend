import React from 'react'
import {useRoutes } from 'react-router-dom'
import { Context } from './context'
import Authorizations from './pages/Auth'
import Messanger from './pages/Messanger'

const Routes = () => {
  const {state} = React.useContext(Context)
  const publickRoutes = [
    {path: '/', element: <Authorizations />}
  ]

  const secretRoutes = [
    {path: '/rooms', element: <Messanger />}
  ]

  const [stackRoutes, setStackRoutes] = React.useState<any[]>(publickRoutes)


  React.useEffect(() => {
    if (state?.isAuth) setStackRoutes([...publickRoutes, ...secretRoutes]) 
  }, [state?.isAuth])

  const routes = useRoutes(stackRoutes)

  return routes
}

export default Routes
