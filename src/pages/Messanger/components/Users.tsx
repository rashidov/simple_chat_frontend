import React from 'react'

const Users: React.FC<{users: string[], userName: string}> = ({users, userName}) => {
  const [usersState, setUsersState] = React.useState<string[]>()

  React.useEffect(() => {
    const newUsers: string[] = []
    
    users.forEach(user => {
      if (user === userName) return;
      newUsers.push(user)
    })

    setUsersState(newUsers)
  }, [users])

  return (
    <div className="messanger__container-users">
      {usersState && usersState.map((user, index) => <User key={`${user}${index}`} name={user} />)}
    </div>
  )
}

export default Users

const User: React.FC<{name: string}> = ({name}) => (
  <div className="user">
    {name}
  </div>
)